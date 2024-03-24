export enum QuizStatus {
  DOWN = "DOWN",
  WAITING_FOR_PLAYERS = "WAITING_FOR_PLAYERS",
  PLAYING = "PLAYING",
}

export enum TypeAnswer {
  SINGLE_ANSWER = "SINGLE_ANSWER",
  MULTIPLE_ANSWERS = "MULTIPLE_ANSWERS",
}

export enum RoomStatusEnum {
  DOWN = "DOWN",
  WAITING_PLAYERS = "WAITING_PLAYERS",
  PLAYING = "PLAYING",
  DONE = "DONE",
}

export enum PlayerTypeEnum {
  PLAYER = "PLAYER",
  MODERATOR = "MODERATOR",
}

export type ParamsQuizUUID = { uuid: string };

export type QueryOptions = {
  page?: number;
  limit?: number;
};

export type QuizQueryOptions = QueryOptions & {
  sortedBy: string;
  orderBy: string;
};

export type ResponseInfo<T> = {
  message: string;
  data: T;
  statusCode: number;
};

export type Answer = {
  uuid?: string;
  answerUUID: string;
  content: string;
  isCorrect: boolean;
  order: number;
  selected?: boolean;
};

export type Question = {
  uuid?: string;
  questionUUID: string;
  title: string;
  description: string;
  secondsToDeliverAnswer: number;
  typeAnswer: TypeAnswer;
  order: number;
  currentQuestion: boolean;
  answerCorrect: boolean;
  showButtons: boolean;
  answers: Answer[];
};

export type Quiz = {
  uuid?: string;
  quizUUID: string;
  title: string;
  description: string;
  coverUrl: string;
  maxPlayerAmount: number;
  status: QuizStatus;
  questions: Question[];
  createdAt?: string;
};

export type Player = {
  playerUUID: string;
  userName: string;
  avatar: string;
  connected: boolean;
  playerType: PlayerTypeEnum;
  accessToken?: string | null;
};

export type User = Player & {
  isUserModerator: boolean;
};

export type Position = Player & {
  totalPoints: number;
};

export type Room = {
  roomUUID: string | null;
  status: RoomStatusEnum;
  isLastQuestion: boolean;
  isRoomOpen: boolean;
  questionsTotal: number;
  moderator: Player | null;
  user: User | null;
  positions: Position[];
  players: Player[];
  quiz: Quiz | null;
  inviteCode: string | null;
  showNextQuestionButton: boolean;
};

export type TimerSettings = {
  autoStart: boolean;
  expiryTimestamp: Date;
};

export type Timer = {
  settings: TimerSettings;
};

export type Common = {
  error: string | null;
  timer: Timer;
};

export type LocalStorageType = {
  accessToken: string | null;
};

export type QuizResponseCollection = ResponseInfo<Quiz[]>;
export type QuizResponseIndividual = ResponseInfo<Quiz>;
