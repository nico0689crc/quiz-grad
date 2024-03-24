import { PlayerType } from 'src/modules/players/entities/players.entity';
import { TypeAnswer } from 'src/modules/questions/entities/question.entity';
import { QuizStatus } from 'src/modules/quizes/entities/quize.entity';
import { RoomStatus } from 'src/modules/rooms/entities/room.entity';

//COMMON
export type Player = {
  playerUUID: string;
  userName: string;
  avatar: string;
  connected?: boolean;
  playerType?: PlayerType;
  accessToken?: string;
};

export type PlayerAccessTokenPayload = {
  quizRoomUIDD: string;
  quizUIDD: string;
  playerUUID: string;
  userName: string;
  socketId: string;
};

export type Answer = {
  answerUUID: string;
  content: string;
  isCorrect: boolean;
  order: number;
  selected?: boolean;
};

export type Question = {
  questionUUID: string;
  title: string;
  description: string;
  secondsToDeliverAnswer: number;
  typeAnswer: TypeAnswer;
  order: number;
  answers: Answer[];
};

export type Quiz = {
  quizUUID: string;
  title: string;
  description: string;
  coverUrl: string;
  maxPlayerAmount: number;
  status: QuizStatus;
  questions: Question[];
};

export type User = Player & {
  isRequiredRegistration: boolean;
  isUserModerator: boolean;
};

export type Position = Player & {
  totalPoints: number;
};

export type Room = {
  roomUUID: string;
  status: RoomStatus;
  questionsTotal: number;
  quiz: Quiz;
  inviteCode?: string;
  positions?: Position[];
};

export type QuizUUID = {
  quizUUID: string;
};

export type RoomUUID = {
  roomUUID: string;
};

export type QuestionUUID = {
  questionUUID: string;
};

export type AnswerUUID = {
  answerUUID: string;
};

export type WebsocketConfirmationResponse = {
  confirm: boolean;
  message: string;
};

export type WebsocketPlayersResponse = {
  players: Player[];
};

// onNewPlayerJoinedToRoom

export type NewPlayerJoinedToRoomBody = QuizUUID & {
  userName: string;
};
export type NewPlayerJoinedToRoomResponse = WebsocketConfirmationResponse &
  Partial<WebsocketPlayersResponse> & {
    player?: Player;
    room?: Room;
  };

// SEND ACCESS TOKEN FOR VALIDATION

export type SendAccessTokenForValidationBody = {
  accessToken: string;
};

export type SendAccessTokenForValidationResponse = WebsocketConfirmationResponse &
  Partial<WebsocketPlayersResponse> & {
    player?: Player;
    room?: Room;
  };
export type NewPlayerJoinedNotificationBody = QuizUUID & {
  userName: string;
};
export type NewPlayerJoinedNotificationResponse = {
  players: Player[];
};
export type CheckQuizRoomIsAvailableBody = QuizUUID;
export type CheckQuizRoomIsAvailableResponse = WebsocketConfirmationResponse;
export type OpenQuizRoomToPlayBody = QuizUUID;
export type OpenQuizRoomToPlayResponse = WebsocketConfirmationResponse & {
  player?: Player;
  room?: Room;
};
export type SendNextQuestionBody = RoomUUID;
export type SendNextQuestionResponse = WebsocketConfirmationResponse & {
  question?: Question;
  roomStatus?: RoomStatus;
};
export type SendAnswerQuestionBody = RoomUUID &
  QuestionUUID & {
    answers: AnswerUUID[];
  };
export type SendAnswerQuestionResponse = WebsocketConfirmationResponse & {
  isAnswerCorrect?: boolean;
};
export type CalculatePointsFromAnswersBody = RoomUUID & QuestionUUID;
export type CalculatePointsFromAnswersResponse = WebsocketConfirmationResponse & {
  positions?: Position[];
  roomStatus?: RoomStatus;
};
