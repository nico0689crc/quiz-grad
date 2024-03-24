import { createContext } from "react";
import { QuizModeratorContextType } from "./types";

export const QuizModeratorContext = createContext(
  {} as QuizModeratorContextType,
);
