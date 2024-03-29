import { createContext } from "react";
import { QuizFormAnswerContextType } from "./type";

export const QuizFormAnswerContext = createContext(
  {} as QuizFormAnswerContextType,
);
