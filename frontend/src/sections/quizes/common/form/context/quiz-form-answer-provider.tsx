import { useCallback, useContext, useMemo, useReducer } from "react";
import { QuizFormAnswerContext } from "./quiz-form-answer-context";
import { Answer } from "@/types";
import { faker } from "@faker-js/faker";

const initialState: Partial<Answer>[] = [
  // {
  //   answerUUID: "fe9d9ee3-43ba-5f90-8194-a4eed5852ebc",
  //   content:
  //     "general fifth brass ability ago town cry standard church construction present west manufacturing zero size until baby sold scared involved cave light fresh clothingautomobile stronger black apart lost doctor whole night rear skill bar anyone west breath similar darkness rod pan feature throat that treated fact easy",
  //   isCorrect: true,
  //   order: 1,
  // },
  // {
  //   answerUUID: "a44a35a9-2d80-54a1-aa56-f293f138e160",
  //   content:
  //     "traffic tube importance whose large sometime religious dawn done dish support lower extra indicate element harder law diameter shoulder iron respect speech wool themautomobile stronger black apart lost doctor whole night rear skill bar anyone west breath similar darkness rod pan feature throat that treated fact easy",
  //   isCorrect: true,
  //   order: 2,
  // },
  // {
  //   answerUUID: "f4cd71f4-4d74-5bfd-9567-aee868de9d64",
  //   content:
  //     "thought or difficult butter stretch off hay review damage origin excellent tell land began report subject strong musical older higher lucky minute dirty buildautomobile stronger black apart lost doctor whole night rear skill bar anyone west breath similar darkness rod pan feature throat that treated fact easy",
  //   isCorrect: false,
  //   order: 3,
  // },
  // {
  //   answerUUID: "6a832f8b-cc06-54f2-bc1d-3f86dc93d843",
  //   content:
  //     "declared blue apple surrounded someone jar anywhere enough men molecular finger forget few broke fresh hit flower lunch find gave class it decide noautomobile stronger black apart lost doctor whole night rear skill bar anyone west breath similar darkness rod pan feature throat that treated fact easy",
  //   isCorrect: true,
  //   order: 4,
  // },
  // {
  //   answerUUID: "94dcb696-85e2-5a88-90f6-d8f5c7c80e70",
  //   content:
  //     "noted task noon travel mad rabbit writing cake basket particular taught paragraph hard manner shoot key bound hardly farther likely done club detail wealthautomobile stronger black apart lost doctor whole night rear skill bar anyone west breath similar darkness rod pan feature throat that treated fact easy",
  //   isCorrect: false,
  //   order: 5,
  // },
];

enum AnswerActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
}

type AnswerAction = {
  type: AnswerActionType;
  payload: Partial<{
    answerUUID: string;
    answer: Partial<Answer>;
  }>;
};

const reducer = (state: Partial<Answer>[], action: AnswerAction) => {
  const { type, payload } = action;
  switch (type) {
    case AnswerActionType.ADD:
      const newState = state.map((answer) => ({ ...answer }));
      payload.answer &&
        newState.push({
          ...payload.answer,
          answerUUID: faker.string.uuid(),
        });
      return newState;
    case AnswerActionType.REMOVE:
      return state.filter((answer) => payload.answerUUID !== answer.answerUUID);
    case AnswerActionType.UPDATE:
      const updateState = state.map((answer) => ({ ...answer }));
      if (payload.answerUUID && payload.answer) {
        const updateAnswerIndex = state.findIndex(
          (answer) => answer.answerUUID === payload.answerUUID,
        );
        updateAnswerIndex > 0 &&
          updateState.splice(updateAnswerIndex, 1, payload.answer);
      }
      return updateState;
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const QuizFormAnswerProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addAnswer = useCallback((answer: Partial<Answer>) => {
    dispatch({ type: AnswerActionType.ADD, payload: { answer } });
  }, []);

  const removeAnswer = useCallback((answerUUID: string) => {
    dispatch({ type: AnswerActionType.REMOVE, payload: { answerUUID } });
  }, []);

  const editAnswer = useCallback(
    (answerUUID: string, answer: Partial<Answer>) => {
      dispatch({
        type: AnswerActionType.REMOVE,
        payload: { answerUUID, answer },
      });
    },
    [],
  );

  const memoizedValue = useMemo(
    () => ({
      answers: state,
      addAnswer,
      removeAnswer,
      editAnswer,
    }),
    [state, addAnswer, removeAnswer, editAnswer],
  );

  return (
    <QuizFormAnswerContext.Provider value={memoizedValue}>
      {children}
    </QuizFormAnswerContext.Provider>
  );
};

export const useQuizFormAnswerContext = () => {
  const context = useContext(QuizFormAnswerContext);

  if (!context) {
    throw new Error(
      "useQuizFormAnswerContext context must be use inside QuizFormAnswerProvider",
    );
  }

  return context;
};
