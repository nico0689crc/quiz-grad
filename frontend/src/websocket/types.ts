import { Player, Question, Room, Position, RoomStatusEnum } from "@/types";

// --------------------- Payload --------------------- //

export type OnNewPlayerJoinedToRoomPayloadType = {
  quizUUID: string;
  userName: string;
};

export type OnCheckQuizRoomIsAvailablePayloadType = {
  quizUUID: string;
};

export type OnSendAccessTokenForValidationPayloadType = {
  accessToken: string;
};

export type OnOpenRoomToPlayPayloadType = {
  quizUUID: string;
};

export type OnSendAnswerQuestionPayloadType = {
  roomUUID: string;
  questionUUID: string;
  answers: {
    answerUUID: string;
  }[];
};

export type OnCalculatePointsFromAnswersPayloadType = {
  roomUUID: string;
  questionUUID: string;
};

export type OnSendNextQuestionPayloadType = {
  roomUUID: string;
};

// --------------------- Response --------------------- //

export type WebsocketConfirmationResponseType = {
  confirm: boolean;
  message: string;
  code?: string;
};

export type WebsocketPlayersResponseType = {
  players: Player[];
};

export type OnNewPlayerJoinedToRoomResponseType =
  WebsocketConfirmationResponseType &
  WebsocketPlayersResponseType & {
    player: Player;
    room: Room;
  };

export type OnCheckQuizRoomIsAvailableResponseType =
  WebsocketConfirmationResponseType;

export type OnNewPlayerJoinedNotificationResponseType =
  WebsocketPlayersResponseType & {
    positions: Position[];
  };

export type OnPlayerDisconnectFromRoomResponseType = {
  playerUUID: string;
  message: string;
};

export type OnSendAccessTokenForValidationResponseType =
  WebsocketConfirmationResponseType &
  WebsocketPlayersResponseType & {
    room: Room;
    player: Player;
  };

export type OnOpenRoomToPlayResponseType = WebsocketConfirmationResponseType & {
  player: Player;
  room: Room;
};

export type OnSendNextQuestionResponseType =
  WebsocketConfirmationResponseType & {
    question: Question;
  };

export type OnNextQuestionResponseType = WebsocketConfirmationResponseType & {
  question: Question;
  roomStatus: RoomStatusEnum;
};

export type OnSendAnswerQuestionResponseType =
  WebsocketConfirmationResponseType & {
    isAnswerCorrect: boolean;
  };

export type OnCalculatePointsFromAnswersResponseType =
  WebsocketConfirmationResponseType & {
    positions: Position[];
    roomStatus: RoomStatusEnum;
  };

// --------------------- Callback --------------------- //

export type OnNewPlayerJoinedToRoomCallbackType = (
  response: OnNewPlayerJoinedToRoomResponseType,
) => void;
export type OnCheckQuizRoomIsAvailableCallbackType = (
  response: OnCheckQuizRoomIsAvailableResponseType,
) => void;
export type OnNewPlayerJoinedNotificationCallbackType = (
  response: OnNewPlayerJoinedNotificationResponseType,
) => void;
export type OnPlayerDisconnectFromRoomCallbackType = (
  response: OnPlayerDisconnectFromRoomResponseType,
) => void;
export type OnNextQuestionCallbackType = (
  response: OnNextQuestionResponseType,
) => void;

export type OnSendAccessTokenForValidationCallbackType = (
  response: OnSendAccessTokenForValidationResponseType,
) => void;
export type OnOpenRoomToPlayCallbackType = (
  response: OnOpenRoomToPlayResponseType,
) => void;
export type OnSendNextQuestionCallbackType = (
  response: OnSendNextQuestionResponseType,
) => void;
export type OnSendAnswerQuestionCallbackType = (
  response: OnSendAnswerQuestionResponseType,
) => void;
export type OnCalculatePointsFromAnswersCallbackType = (
  response: OnCalculatePointsFromAnswersResponseType,
) => void;
