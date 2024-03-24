import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { LessThan, Not } from 'typeorm';

import { Services } from '../constants';
import { generateAccessToken, generateUUID, verifyAccessToken } from '../helpers';
import {
  CalculatePointsFromAnswersBody,
  CalculatePointsFromAnswersResponse,
  CheckQuizRoomIsAvailableBody,
  CheckQuizRoomIsAvailableResponse,
  NewPlayerJoinedToRoomBody,
  NewPlayerJoinedToRoomResponse,
  OpenQuizRoomToPlayBody,
  OpenQuizRoomToPlayResponse,
  PlayerAccessTokenPayload,
  SendAccessTokenForValidationBody,
  SendAccessTokenForValidationResponse,
  SendAnswerQuestionBody,
  SendAnswerQuestionResponse,
  SendNextQuestionBody,
  SendNextQuestionResponse,
} from './types';

import { Room, RoomStatus } from 'src/modules/rooms/entities/room.entity';
import { PlayerType } from 'src/modules/players/entities/players.entity';
import { RoomQuestionStatus } from 'src/modules/room-questions/entities/room-questions.entity';

import { IGatewayService } from './interface';
import { IRoomService } from 'src/modules/rooms/interfaces';
import { IQuizService } from 'src/modules/quizes/interfaces';
import { IPlayerService } from 'src/modules/players/interfaces';
import { IRoomQuestionService } from 'src/modules/room-questions/interfaces';
import { IQuestionService } from 'src/modules/questions/interfaces';
import { IRoomQuestionAnswerService } from 'src/modules/room-question-answers/interfaces';

@Injectable()
export class GatewayService implements IGatewayService {
  constructor(
    @Inject(Services.QUESTION) private questionsService: IQuestionService,
    @Inject(Services.ROOM) private roomsService: IRoomService,
    @Inject(Services.ROOM_QUESTION) private roomsQuestionService: IRoomQuestionService,
    @Inject(Services.ROOM_QUESTION_ANSWER) private roomsQuestionAnswerService: IRoomQuestionAnswerService,
    @Inject(Services.PLAYER) private playersService: IPlayerService,
    @Inject(Services.QUIZ) private quizsService: IQuizService
  ) { }

  async playerDisconnectFromRoom(socket: Socket): Promise<void> {
    const player = await this.playersService.findOne({ where: { socketId: socket.id }, relations: ['room', 'room.quiz'] });

    if (player) {
      await this.playersService.update({ socketId: socket.id }, { connected: false });
      socket
        .to(player.room.quiz.uuid)
        .emit('onPlayerDisconnectFromRoom', { playerUUID: player.uuid, message: `Players ${player.userName} has gone.` });
    }
  }

  async newPlayerJoinedToRoom({ userName, quizUUID }: NewPlayerJoinedToRoomBody, socket: Socket): Promise<NewPlayerJoinedToRoomResponse> {
    const quiz = await this.quizsService.findOne({
      relations: ['questions'],
      where: {
        uuid: quizUUID,
      },
    });
    if (!quiz) {
      return { confirm: false, message: 'Quiz associate with quizUUID does not exist.' };
    }

    const room = await this.roomsService.findOne({
      where: { quiz, status: Not([RoomStatus.DONE]) },
      relations: ['players', 'quiz', 'quiz.questions', 'roomQuestions', 'roomQuestions.question', 'roomQuestions.question.answers'],
      order: { createdAt: 'DESC' },
    });


    if (!room) {
      return { confirm: false, message: 'Does not exist a room open here.' };
    }

    const player = await this.playersService.create({ room, socketId: socket.id, userName, playerType: PlayerType.PLAYER });

    const accessToken = generateAccessToken<PlayerAccessTokenPayload>({
      quizRoomUIDD: player.room.uuid,
      quizUIDD: quiz.uuid,
      playerUUID: player.uuid,
      userName: player.userName,
      socketId: player.socketId,
    });

    const players = await this.getAllPlayers(room);

    const playersFromRoom = await this.playersService.findAll({ where: { room }, relations: ['roomQuestionAnswers'] });

    const positions = playersFromRoom
      .filter((player) => player.playerType !== PlayerType.MODERATOR)
      .map((player) => {
        return {
          playerUUID: player.uuid,
          userName: player.userName,
          avatar: player.avatar,
          totalPoints: player.roomQuestionAnswers
            .map((roomQuestionAnswer) => roomQuestionAnswer.points)
            .reduce((total, points) => total + points, 0),
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    socket.join(quiz.uuid);

    socket.to(quiz.uuid).emit('onNewPlayerJoinedNotification', { players, positions });

    return {
      confirm: true,
      message: 'You are register in the room.',
      player: { ...player, playerUUID: player.uuid, accessToken },
      players,
      room: {
        roomUUID: room.uuid,
        status: room.status,
        questionsTotal: quiz.questions.length,
        inviteCode: room.inviteCode,
        positions,
        quiz: {
          ...quiz,
          quizUUID: quiz.uuid,
          questions: room.roomQuestions.map((roomQuestion) => ({
            questionUUID: roomQuestion.question.uuid,
            title: roomQuestion.question.title,
            description: roomQuestion.question.description,
            secondsToDeliverAnswer: roomQuestion.question.secondsToDeliverAnswer,
            typeAnswer: roomQuestion.question.typeAnswer,
            order: roomQuestion.question.order,
            currentQuestion: roomQuestion.status === RoomQuestionStatus.CURRENT,
            answerCorrect: !!roomQuestion.question.answers.find((answer) => answer.isCorrect),
            answers: roomQuestion.question.answers.map((answer) => ({
              answerUUID: answer.uuid,
              content: answer.content,
              isCorrect: answer.isCorrect,
              order: answer.order,
            })),
          })),
        },
      },
    };
  }

  async sendAccessTokenForValidation(
    { accessToken }: SendAccessTokenForValidationBody,
    socket: Socket
  ): Promise<SendAccessTokenForValidationResponse> {
    const playerPayload: PlayerAccessTokenPayload = verifyAccessToken(accessToken);

    if (!playerPayload) {
      return { confirm: false, message: 'Not valid Access Token.' };
    }

    const quiz = await this.quizsService.findOne({
      relations: ['questions'],
      where: {
        uuid: playerPayload.quizUIDD,
      },
    });

    if (!quiz) {
      return { confirm: false, message: 'Quiz associate with this token does not exist.' };
    }

    const room = await this.roomsService.findOne({
      where: { quiz, status: Not([RoomStatus.DONE]) },
      relations: ['players', 'roomQuestions', 'roomQuestions.question', 'roomQuestions.question.answers'],
      order: { createdAt: 'DESC' },
    });

    if (!room) {
      return { confirm: false, message: 'Room associate with this token does not exist.' };
    }

    const player = await this.playersService.findOne({ where: { uuid: playerPayload.playerUUID } });
    if (!player) {
      return { confirm: false, message: 'Player associate with this token does not exist.' };
    }

    await this.playersService.update({ uuid: playerPayload.playerUUID }, { connected: true, socketId: socket.id });

    const players = await this.getAllPlayers(room);

    const playersFromRoom = await this.playersService.findAll({ where: { room }, relations: ['roomQuestionAnswers'] });

    const positions = playersFromRoom
      .filter((player) => player.playerType !== PlayerType.MODERATOR)
      .map((player) => {
        return {
          playerUUID: player.uuid,
          userName: player.userName,
          avatar: player.avatar,
          totalPoints: player.roomQuestionAnswers
            .map((roomQuestionAnswer) => roomQuestionAnswer.points)
            .reduce((total, points) => total + points, 0),
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    socket.join(quiz.uuid);
    socket.to(quiz.uuid).emit('onNewPlayerJoinedNotification', { players });

    return {
      confirm: true,
      message: `Welcome back ${playerPayload.userName} - ${playerPayload.playerUUID}.`,
      players,
      room: {
        roomUUID: room.uuid,
        status: room.status,
        questionsTotal: quiz.questions.length,
        inviteCode: room.inviteCode,
        positions,
        quiz: {
          ...quiz,
          quizUUID: quiz.uuid,
          questions: room.roomQuestions.map((roomQuestion) => ({
            questionUUID: roomQuestion.question.uuid,
            title: roomQuestion.question.title,
            description: roomQuestion.question.description,
            secondsToDeliverAnswer: roomQuestion.question.secondsToDeliverAnswer,
            typeAnswer: roomQuestion.question.typeAnswer,
            order: roomQuestion.question.order,
            currentQuestion: roomQuestion.status === RoomQuestionStatus.CURRENT,
            answerCorrect: !!roomQuestion.question.answers.find((answer) => answer.isCorrect),
            answers: roomQuestion.question.answers.map((answer) => ({
              answerUUID: answer.uuid,
              content: answer.content,
              isCorrect: answer.isCorrect,
              order: answer.order,
            })),
          })),
        },
      },
      player: {
        ...player,
        playerUUID: player.uuid,
      },
    };
  }

  async checkQuizRoomIsAvailable({ quizUUID }: CheckQuizRoomIsAvailableBody): Promise<CheckQuizRoomIsAvailableResponse> {
    const quiz = await this.quizsService.findOne({ where: { uuid: quizUUID }, relations: ['questions', 'questions.answers'] });
    if (!quiz) {
      return {
        confirm: false,
        message: 'Quiz not found',
      };
    }

    await this.roomsService.delete({ createdAt: LessThan(this.getOneDayAgoTimestamp()), status: Not(RoomStatus.DONE) });

    const room = await this.roomsService.findOne({
      where: { quiz, status: Not([RoomStatus.DONE]) },
      order: { createdAt: 'DESC' },
      relations: ['roomQuestions', 'roomQuestions.question', 'roomQuestions.question.answers'],
    });
    if (!room) {
      return {
        confirm: false,
        message: 'Room is not open to play',
      };
    }

    return {
      confirm: true,
      message: 'Room is open to play',
    };
  }

  async openQuizRoomToPlay({ quizUUID }: OpenQuizRoomToPlayBody, socket: Socket): Promise<OpenQuizRoomToPlayResponse> {
    const quiz = await this.quizsService.findOne({ where: { uuid: quizUUID }, relations: ['questions'] });
    if (!quiz) {
      return { confirm: false, message: 'Quiz associate with quizUUID does not exist.' };
    }

    await this.roomsService.delete({ status: RoomStatus.WAITING_PLAYERS, quiz });

    const room = await this.roomsService.create(quiz);

    const player = await this.playersService.create({
      room,
      socketId: socket.id,
      userName: PlayerType.MODERATOR,
      playerType: PlayerType.MODERATOR,
    });

    const accessToken = generateAccessToken({
      quizRoomUIDD: player.room.uuid,
      quizUIDD: quiz.uuid,
      playerUUID: player.uuid,
      userName: player.userName,
      socketId: player.socketId,
    });

    socket.join(quiz.uuid);

    return {
      confirm: true,
      message: 'You are register in the room.',
      player: { ...player, playerUUID: player.uuid, accessToken },
      room: {
        status: room.status,
        roomUUID: room.uuid,
        questionsTotal: quiz.questions.length,
        inviteCode: room.inviteCode,
        quiz: {
          ...quiz,
          quizUUID: quiz.uuid,
          questions: [],
        },
      },
    };
  }

  async onSendNextQuestion({ roomUUID }: SendNextQuestionBody, socket: Socket): Promise<SendNextQuestionResponse> {
    const room = await this.roomsService.findOne({
      where: { uuid: roomUUID },
      relations: ['quiz', 'quiz.questions', 'roomQuestions', 'roomQuestions.question'],
    });

    if (!room) {
      return {
        confirm: false,
        message: 'Room not found.',
      };
    }

    const nextQuestionId = room.quiz.questions
      .map((question) => question.id)
      .filter((questionId) => !room.roomQuestions.map((roomQuestion) => roomQuestion.question.id).includes(questionId))
      .shift();

    if (!nextQuestionId) {
      return {
        confirm: false,
        message: 'Room with all questions resolved.',
      };
    }

    const question = await this.questionsService.findOne({ where: { id: nextQuestionId }, relations: ['answers'] });

    if (!question) {
      return {
        confirm: false,
        message: 'Question not found.',
      };
    }
    await this.roomsQuestionService.update({ room, status: RoomQuestionStatus.CURRENT }, { status: RoomQuestionStatus.DONE });
    await this.roomsQuestionService.create({ room, question, status: RoomQuestionStatus.CURRENT, uuid: generateUUID() });

    const questionToSend = {
      questionUUID: question.uuid,
      title: question.title,
      description: question.description,
      secondsToDeliverAnswer: question.secondsToDeliverAnswer,
      typeAnswer: question.typeAnswer,
      order: question.order,
      answers: question.answers.map((answer) => ({
        answerUUID: answer.uuid,
        content: answer.content,
        isCorrect: answer.isCorrect,
        order: answer.order,
      })),
    };

    const lastQuestion = room.quiz.questions.pop()?.id === nextQuestionId;

    await this.roomsService.update({ id: room.id }, { status: lastQuestion ? RoomStatus.DONE : RoomStatus.PLAYING });

    socket.to(room.quiz.uuid).emit('onNextQuestion', {
      confirm: true,
      message: 'Room Question  created',
      question: questionToSend,
    });

    return {
      confirm: true,
      message: 'Room Question  created',
      question: questionToSend,
    };
  }

  async onSendAnswerQuestion(
    { answers, questionUUID, roomUUID }: SendAnswerQuestionBody,
    socket: Socket
  ): Promise<SendAnswerQuestionResponse> {
    const room = await this.roomsService.findOne({ where: { uuid: roomUUID } });
    if (!room) {
      return { confirm: false, message: 'Room not found.' };
    }

    const question = await this.questionsService.findOne({ where: { uuid: questionUUID }, relations: ['answers'] });
    if (!question) {
      return { confirm: false, message: 'Question not found' };
    }

    const player = await this.playersService.findOne({ where: { socketId: socket.id } });
    const roomQuestion = await this.roomsQuestionService.findOne({ where: { room, question } });
    const correctAnswers = question.answers.filter((answer) => answer.isCorrect).map((answer) => answer.uuid);
    const isCorrect = this.arrayEqual(
      correctAnswers,
      answers.map((answer) => answer.answerUUID)
    );
    const roomQuestionAnswer = await this.roomsQuestionAnswerService.create({ isCorrect, player, roomQuestion, uuid: generateUUID() });

    return {
      confirm: true,
      message: 'Answer received',
      isAnswerCorrect: roomQuestionAnswer.isCorrect,
    };
  }

  async onCalculatePointsFromAnswers({
    questionUUID,
    roomUUID,
  }: CalculatePointsFromAnswersBody): Promise<CalculatePointsFromAnswersResponse> {
    const room = await this.roomsService.findOne({ where: { uuid: roomUUID } });

    if (!room) {
      return {
        confirm: false,
        message: 'Room not found.',
      };
    }

    const question = await this.questionsService.findOne({ where: { uuid: questionUUID }, relations: ['answers'] });

    if (!question) {
      return {
        confirm: false,
        message: 'Question not found',
      };
    }

    const roomQuestion = await this.roomsQuestionService.findOne({ where: { room, question }, relations: ['roomQuestionAnswers'] });

    const roomQuestionAnswersPromises = roomQuestion.roomQuestionAnswers.map((roomQuestionAnswer, order) => {
      const base = roomQuestionAnswer.isCorrect ? 100 : 0;
      const roomQuestionAnswersCount = roomQuestion.roomQuestionAnswers.length;
      const points = roomQuestionAnswersCount * base + (roomQuestionAnswersCount * base - roomQuestionAnswersCount * base * order);

      return this.roomsQuestionAnswerService.update({ id: roomQuestionAnswer.id }, { points });
    });

    await Promise.all(roomQuestionAnswersPromises);

    const playersFromRoom = await this.playersService.findAll({ where: { room }, relations: ['roomQuestionAnswers'] });

    const positions = playersFromRoom
      .filter((player) => player.playerType !== PlayerType.MODERATOR)
      .map((player) => {
        return {
          playerUUID: player.uuid,
          userName: player.userName,
          avatar: player.avatar,
          totalPoints: player.roomQuestionAnswers
            .map((roomQuestionAnswer) => roomQuestionAnswer.points)
            .reduce((total, points) => total + points, 0),
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return {
      confirm: true,
      message: 'Answer received',
      positions,
      roomStatus: room.status,
    };
  }

  private async getAllPlayers({ id }: Room) {
    return this.roomsService.findAllPlayers({ where: { id } });
  }

  private arrayEqual(array1: string[], array2: string[]) {
    if (array1.length !== array2.length) {
      return false;
    }
    const sortedArr1 = array1.slice().sort();
    const sortedArr2 = array2.slice().sort();
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }
    return true;
  }

  private getOneDayAgoTimestamp(): Date {
    return new Date(Date.now() - 12 * 60 * 60 * 1000);
  }
}
