import { RoomStatusEnum, User } from "@/types";

export type QuizContextType = {
  user: User | null;
  loading: boolean;
  isRoomOpen: boolean;
  isRunning: boolean;
  totalSeconds: number;
  error: string | null;
  status: RoomStatusEnum;
  sendNextQuestion: () => void;
  connectToRoom: (userName: string) => void;
  setAnswerSelectedHandler: (answerUUID: string, checked: boolean) => void;
  sendAnswer: () => void;
};
