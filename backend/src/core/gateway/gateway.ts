import { Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Services } from '../constants';
import { Inject } from '@nestjs/common';
import {
  CalculatePointsFromAnswersBody,
  CheckQuizRoomIsAvailableBody,
  NewPlayerJoinedToRoomBody,
  OpenQuizRoomToPlayBody,
  SendAccessTokenForValidationBody,
  SendAnswerQuestionBody,
  SendNextQuestionBody,
} from './types';
import { IGatewayService } from './interface';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3402', 'https://quizgrad.nicolasarielfernandez.tech', 'http://localhost:3502'],
    credentials: true,
  },
})
export class QuizGateway implements OnGatewayDisconnect {
  constructor(@Inject(Services.GATEWAY) private gatewayService: IGatewayService) {}

  handleDisconnect(socket: Socket) {
    this.gatewayService.playerDisconnectFromRoom(socket);
  }

  @SubscribeMessage('onCheckQuizRoomIsAvailable')
  onCheckQuizRoomIsAvailableHandler(@MessageBody() messageBody: CheckQuizRoomIsAvailableBody) {
    return this.gatewayService.checkQuizRoomIsAvailable(messageBody);
  }

  @SubscribeMessage('onOpenRoomToPlay')
  onOpenRoomToPlayHandler(@MessageBody() messageBody: OpenQuizRoomToPlayBody, @ConnectedSocket() socket: Socket) {
    return this.gatewayService.openQuizRoomToPlay(messageBody, socket);
  }

  @SubscribeMessage('onSendAccessTokenForValidation')
  onSendAccessTokenForValidationHandler(@MessageBody() messageBody: SendAccessTokenForValidationBody, @ConnectedSocket() socket: Socket) {
    return this.gatewayService.sendAccessTokenForValidation(messageBody, socket);
  }

  @SubscribeMessage('onSendNextQuestion')
  onSendNextQuestionHandler(@MessageBody() messageBody: SendNextQuestionBody, @ConnectedSocket() socket: Socket) {
    return this.gatewayService.onSendNextQuestion(messageBody, socket);
  }

  @SubscribeMessage('onSendAnswerQuestion')
  onSendAnswerQuestionHandler(@MessageBody() messageBody: SendAnswerQuestionBody, @ConnectedSocket() socket: Socket) {
    return this.gatewayService.onSendAnswerQuestion(messageBody, socket);
  }

  @SubscribeMessage('onNewPlayerJoinedToRoom')
  onNewPlayerJoinedToRoomHandler(@MessageBody() messageBody: NewPlayerJoinedToRoomBody, @ConnectedSocket() socket: Socket) {
    return this.gatewayService.newPlayerJoinedToRoom(messageBody, socket);
  }

  @SubscribeMessage('onCalculatePointsFromAnswers')
  onCalculatePointsFromAnswersHandler(@MessageBody() messageBody: CalculatePointsFromAnswersBody, @ConnectedSocket() socket: Socket) {
    return this.gatewayService.onCalculatePointsFromAnswers(messageBody, socket);
  }
}
