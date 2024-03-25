import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "@/types";

type QuizState = {
  quiz: Partial<Quiz>;
};

const initialState: QuizState = {
  quiz: {
    title: "",
    description: "",
    questions: [],
  },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.quiz.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.quiz.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = quizSlice.actions;
export default quizSlice.reducer;
