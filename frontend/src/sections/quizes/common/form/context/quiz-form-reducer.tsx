import { faker } from "@faker-js/faker";
import { Question } from "@/types";
import { StateType, ActionTypes, ActionsEnum } from "./type";

export const reducer = (state: StateType, action: ActionTypes) => {
  const { type, payload } = action;
  let questionIndex: number;
  let questionToUpdate: Partial<Question>;
  switch (type) {
    case ActionsEnum.INIT:
      if (!payload.questions || !payload.title || !payload.description) {
        return state;
      }

      return {
        ...state,
        title: payload.title,
        description: payload.description,
        questions: payload.questions.map(question => ({
          ...question,
          answers: question.answers.map(answer => ({
            ...answer
          }))
        }))
      }
    case ActionsEnum.ADD_QUESTION:
      if (!payload.question) {
        return state;
      }
      return {
        ...state,
        questions: [
          ...state.questions.map((answer) => ({ ...answer })),
          {
            ...payload.question,
            questionUUID: faker.string.uuid(),
          },
        ],
      };
    case ActionsEnum.REMOVE_QUESTION:
      if (!payload.questionUUID) {
        return state;
      }
      return {
        ...state,
        questions: [
          ...state.questions
            .map((question) => ({
              ...question,
              answers: question.answers?.map((answer) => ({ ...answer })),
            }))
            .filter(
              (question) => payload.questionUUID !== question.questionUUID,
            ),
        ],
      };
    case ActionsEnum.UPDATE_QUESTION:
      if (!payload.questionUUID || !payload.question) {
        return state;
      }
      questionIndex = state.questions.findIndex(
        (question) => question.questionUUID === payload.questionUUID,
      );

      questionToUpdate = {
        ...state.questions[questionIndex],
        ...payload.question,
        answers:
          state.questions[questionIndex].answers?.map((answer) => ({
            ...answer,
          })) ?? [],
      };

      state.questions.splice(questionIndex, 1, questionToUpdate);

      return {
        ...state,
        questions: [
          ...state.questions.map((question) => ({
            ...question,
            answers: question.answers?.map((answer) => ({ ...answer })),
          })),
        ],
      };
    case ActionsEnum.ADD_ANSWER:
      if (!payload.questionUUID || !payload.answer) {
        return state;
      }

      questionIndex = state.questions.findIndex(
        (question) => question.questionUUID === payload.questionUUID,
      );

      questionToUpdate = {
        ...state.questions[questionIndex],
        answers: [
          ...(state.questions[questionIndex].answers?.map((answer) => ({
            ...answer,
          })) ?? []),
          {
            ...payload.answer,
            answerUUID: faker.string.uuid(),
          },
        ],
      };

      state.questions.splice(questionIndex, 1, questionToUpdate);

      return {
        ...state,
        questions:
          state.questions.map((question) => ({
            ...question,
            answers: question.answers?.map((answer) => ({ ...answer })),
          })) ?? [],
      };
    case ActionsEnum.REMOVE_ANSWER:
      if (!payload.questionUUID || !payload.answerUUID) {
        return state;
      }
      questionIndex = state.questions.findIndex(
        (question) => question.questionUUID === payload.questionUUID,
      );

      questionToUpdate = {
        ...state.questions[questionIndex],
        answers: [
          ...(state.questions[questionIndex].answers
            ?.filter((answer) => answer.answerUUID !== payload.answerUUID)
            .map((answer) => ({
              ...answer,
            })) ?? []),
        ],
      };

      state.questions.splice(questionIndex, 1, questionToUpdate);

      return {
        ...state,
        questions: state.questions.map((question) => ({
          ...question,
          answers: question.answers?.map((answer) => ({ ...answer })),
        })),
      };
    case ActionsEnum.UPDATE_ANSWER:
      if (!payload.questionUUID || !payload.answerUUID || !payload.answer) {
        return state;
      }

      questionIndex = state.questions.findIndex(
        (question) => question.questionUUID === payload.questionUUID,
      );

      if (questionIndex < 0) {
        return state;
      }

      const answerIndex = state.questions[questionIndex].answers?.findIndex(
        (answer) => answer.answerUUID === payload.answerUUID,
      );
      const answerUpdated = {
        ...state.questions[questionIndex].answers?.find(
          (answer) => answer.answerUUID === payload.answerUUID,
        ),
        ...payload.answer,
      };

      state.questions[questionIndex].answers?.splice(
        answerIndex!,
        1,
        answerUpdated,
      );

      return {
        ...state,
        questions: [
          ...state.questions.map((question) => ({
            ...question,
            answers: question.answers?.map((answer) => ({ ...answer })),
          })),
        ],
      };
    case ActionsEnum.SET_DETAILS:
      return {
        ...state,
        ...(payload.title && { title: payload.title }),
        ...(payload.description && {
          description: payload.description,
        }),
        questions: state.questions.map((question) => ({
          ...question,
          answers: question.answers?.map((answer) => ({ ...answer })),
        })),
      };
    default:
      return state;
  }
};
