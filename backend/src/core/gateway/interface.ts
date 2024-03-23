import { Socket } from 'socket.io';
import {
  CalculatePointsFromAnswersBody,
  CalculatePointsFromAnswersResponse,
  CheckQuizRoomIsAvailableBody,
  CheckQuizRoomIsAvailableResponse,
  NewPlayerJoinedToRoomBody,
  NewPlayerJoinedToRoomResponse,
  OpenQuizRoomToPlayBody,
  OpenQuizRoomToPlayResponse,
  SendAccessTokenForValidationBody,
  SendAccessTokenForValidationResponse,
  SendAnswerQuestionBody,
  SendAnswerQuestionResponse,
  SendNextQuestionBody,
  SendNextQuestionResponse,
} from './types';

export interface IGatewayService {
  openQuizRoomToPlay(messageBody: OpenQuizRoomToPlayBody, socket: Socket): Promise<OpenQuizRoomToPlayResponse>;
  onSendNextQuestion(messageBody: SendNextQuestionBody, socket: Socket): Promise<SendNextQuestionResponse>;
  onSendAnswerQuestion(messageBody: SendAnswerQuestionBody, socket: Socket): Promise<SendAnswerQuestionResponse>;
  onCalculatePointsFromAnswers(messageBody: CalculatePointsFromAnswersBody, socket: Socket): Promise<CalculatePointsFromAnswersResponse>;
  checkQuizRoomIsAvailable(messageBody: CheckQuizRoomIsAvailableBody): Promise<CheckQuizRoomIsAvailableResponse>;
  sendAccessTokenForValidation(
    messageBody: SendAccessTokenForValidationBody,
    socket: Socket
  ): Promise<SendAccessTokenForValidationResponse>;
  newPlayerJoinedToRoom(messageBody: NewPlayerJoinedToRoomBody, socket: Socket): Promise<NewPlayerJoinedToRoomResponse>;
  playerDisconnectFromRoom(socket: Socket): Promise<void>;
}
