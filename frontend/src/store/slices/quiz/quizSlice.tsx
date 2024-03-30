import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Question, Quiz, TypeAnswer } from "@/types";
import { faker } from "@faker-js/faker";

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
    addQuestionToQuiz: (state, action: PayloadAction<Partial<Question>>) => {
      action?.payload &&
        state.quiz.questions?.push({
          title: action.payload.title as string,
          description: action.payload.description as string,
          answerCorrect: false,
          answers: action.payload.answers || [],
          currentQuestion: false,
          order: 0,
          secondsToDeliverAnswer: action.payload
            .secondsToDeliverAnswer as number,
          showButtons: false,
          typeAnswer: TypeAnswer.MULTIPLE_ANSWERS,
          uuid: faker.string.uuid(),
          questionUUID: faker.string.uuid(),
          status: "CREATED",
        });
    },
  },
});

export const { setTitle, setDescription, addQuestionToQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
