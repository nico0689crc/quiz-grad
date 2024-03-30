import { Box, Card, Typography } from "@mui/material";

import { useTranslate } from "@/locales";

import QuizQuestionsList from "@/sections/quizes/common/playground/quiz-questions-list";
import { useQuizFormContext } from "../context/quiz-form-provider";

const QuizFormListQuestions = () => {
  const { t } = useTranslate();
  const { questions } = useQuizFormContext();

  return (
    <>
      {questions && questions.length > 0 ? (
        <QuizQuestionsList questions={questions} showMutationActions={true} />
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
