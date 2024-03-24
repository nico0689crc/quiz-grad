import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "@/types";

type QuizState = {
  quiz: Quiz | null;
  loading: boolean;
};

const initialState: QuizState = {
  quiz: null,
  loading: true,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<Partial<Quiz>>) => {
      if (state.quiz) {
        state.quiz = { ...state.quiz, ...action.payload };
      }
    },
  },
});

export const { setQuiz } = quizSlice.actions;
export default quizSlice.reducer;
