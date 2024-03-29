import { Answer } from "@/types";

export type QuizFormAnswerContextType = {
  answers: Partial<Answer>[];
  addAnswer: (answer: Partial<Answer>) => void;
  removeAnswer: (answerUUID: string) => void;
  editAnswer: (answerUUID: string, answer: Partial<Answer>) => void;
};
