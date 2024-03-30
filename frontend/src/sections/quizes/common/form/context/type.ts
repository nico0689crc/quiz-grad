import { Answer, Question } from "@/types";

export type QuizFormContextType = {
  title: string;
  description: string;
  questions: Partial<Question>[];
  addQuestion: (question: Partial<Question>) => void;
  removeQuestion: (questionUUID: string) => void;
  updateQuestion: (questionUUID: string, question: Partial<Question>) => void;
  addAnswer: (questionUUID: string, answer: Partial<Answer>) => void;
  removeAnswer: (questionUUID: string, answerUUID: string) => void;
  setDetails: (details: { title?: string; description?: string }) => void;
  updateAnswer: (
    questionUUID: string,
    answerUUID: string,
    answer: Partial<Answer>,
  ) => void;
  questionToCreate: Partial<Question> | undefined;
};

export type StateType = {
  title: string;
  description: string;
  questions: Partial<Question>[];
};

export enum ActionsEnum {
  ADD_QUESTION = "ADD_QUESTION",
  REMOVE_QUESTION = "REMOVE_QUESTION",
  UPDATE_QUESTION = "UPDATE_QUESTION",
  ADD_ANSWER = "ADD_ANSWER",
  REMOVE_ANSWER = "REMOVE_ANSWER",
  UPDATE_ANSWER = "UPDATE_ANSWER",
  SET_DETAILS = "SET_DETAILS",
}

export type ActionTypes = {
  type: ActionsEnum;
  payload: Partial<{
    title: string;
    description: string;
    questionUUID: string;
    answerUUID: string;
    question: Partial<Question>;
    answer: Partial<Answer>;
  }>;
};
