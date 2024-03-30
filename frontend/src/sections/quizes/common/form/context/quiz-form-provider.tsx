import { useCallback, useContext, useMemo, useReducer } from "react";
import { QuizFormContext } from "./quiz-form-context";
import { reducer } from "./quiz-form-reducer";
import { StateType, ActionsEnum } from "./type";
import { Answer, Question } from "@/types";

const initialState: StateType = {
  title: "",
  description: "",
  questions: [],
};

type Props = {
  children: React.ReactNode;
};

export const QuizFormProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addQuestion = useCallback((question: Partial<Question>) => {
    dispatch({
      type: ActionsEnum.ADD_QUESTION,
      payload: { question },
    });
  }, []);

  const removeQuestion = useCallback((questionUUID: string) => {
    dispatch({
      type: ActionsEnum.REMOVE_QUESTION,
      payload: { questionUUID },
    });
  }, []);

  const updateQuestion = useCallback(
    (questionUUID: string, question: Partial<Question>) => {
      dispatch({
        type: ActionsEnum.UPDATE_QUESTION,
        payload: { questionUUID, question },
      });
    },
    [],
  );

  const addAnswer = useCallback(
    (questionUUID: string, answer: Partial<Answer>) => {
      dispatch({
        type: ActionsEnum.ADD_ANSWER,
        payload: { questionUUID, answer },
      });
    },
    [],
  );

  const removeAnswer = useCallback(
    (questionUUID: string, answerUUID: string) => {
      dispatch({
        type: ActionsEnum.REMOVE_ANSWER,
        payload: { questionUUID, answerUUID },
      });
    },
    [],
  );

  const updateAnswer = useCallback(
    (questionUUID: string, answerUUID: string, answer: Partial<Answer>) => {
      dispatch({
        type: ActionsEnum.UPDATE_ANSWER,
        payload: { questionUUID, answerUUID, answer },
      });
    },
    [],
  );

  const setDetails = useCallback(
    ({ title, description }: { title?: string; description?: string }) => {
      dispatch({
        type: ActionsEnum.SET_DETAILS,
        payload: { title, description },
      });
    },
    [],
  );

  const questionToCreate = useCallback(
    () => state.questions.find((question) => question.status === "CREATING"),
    [state.questions],
  );

  const memoizedValue = useMemo(
    () => ({
      title: state.title,
      description: state.description,
      questions: state.questions.filter(
        (question) => question.status !== "CREATING",
      ),
      questionToCreate: questionToCreate(),
      addQuestion,
      removeQuestion,
      updateQuestion,
      addAnswer,
      removeAnswer,
      updateAnswer,
      setDetails,
    }),
    [
      state.questions,
      state.description,
      state.title,
      addQuestion,
      removeQuestion,
      updateQuestion,
      addAnswer,
      removeAnswer,
      updateAnswer,
      setDetails,
    ],
  );

  return (
    <QuizFormContext.Provider value={memoizedValue}>
      {children}
    </QuizFormContext.Provider>
  );
};

export const useQuizFormContext = () => {
  const context = useContext(QuizFormContext);

  if (!context) {
    throw new Error(
      "useQuizFormContext context must be use inside QuizFormProvider",
    );
  }

  return context;
};
