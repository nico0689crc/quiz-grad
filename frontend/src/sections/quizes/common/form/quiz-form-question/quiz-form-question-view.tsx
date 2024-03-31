import { AnimatePresence, m } from "framer-motion";
import { useBoolean } from "@/hooks/use-boolean";
import QuizFormQuestionForm from "./quiz-form-question-form";
import QuizFormQuestionButton from "./quiz-form-question-button";
import { varFade } from "@/components/animate";
import { useCallback } from "react";
import { useQuizFormContext } from "../context/quiz-form-provider";
import { Card, Stack } from "@mui/material";

const QuizFormQuestionCreateView = () => {
  const questionFormVisible = useBoolean(false);
  const { addQuestion } = useQuizFormContext();

  const openQuizFormQuestionHandler = useCallback(() => {
    addQuestion({
      title: "",
      description: "",
      answers: [],
      secondsToDeliverAnswer: 45,
      status: "CREATING",
    });
    questionFormVisible.onToggle();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {questionFormVisible.value ? (
        <m.div key="question-form" {...varFade().in}>
          <Stack component={Card} spacing={3} sx={{ p: 3 }}>
            <QuizFormQuestionForm
              questionFormToggle={questionFormVisible.onToggle}
            />
          </Stack>
        </m.div>
      ) : (
        <m.div key="question-add-button" {...varFade().in}>
          <QuizFormQuestionButton
            questionFormToggle={openQuizFormQuestionHandler}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default QuizFormQuestionCreateView;
