import { Box, Card, Typography } from "@mui/material";

import { useTranslate } from "@/locales";

import { RootState, useAppSelector } from "@/store";

import QuizQuestionsList from "@/sections/quizes/common/playground/quiz-questions-list";

const QuizFormListQuestions = () => {
  const { t } = useTranslate();
  const { questions } = useAppSelector((state: RootState) => state.quiz.quiz);

  return (
    <>
      {questions && questions.length > 0 ? (
        <QuizQuestionsList questions={questions} />
      ) : (
        <Box
          component={Card}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Typography variant="subtitle2">
            {t("quiz_form.labels.no_questions")}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default QuizFormListQuestions;
