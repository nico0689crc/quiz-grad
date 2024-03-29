import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslate } from "@/locales";
import QuizFormListAnswers from "@/sections/quizes/common/form/quiz-form-list-answers";
import { QuizFormAnswerProvider } from "../context/quiz-form-answer-provider";
import { QuizFormAnswerContext } from "../context/quiz-form-answer-context";
import { AnimatePresence, m } from "framer-motion";
import { varFade } from "@/components/animate";
import { useBoolean } from "@/hooks/use-boolean";
import QuizFormAnswer from "./quiz-form-answer";

const QuizFormAnswerView = () => {
  const answerFormView = useBoolean(false);
  const { t } = useTranslate();

  return (
    <QuizFormAnswerProvider>
      <QuizFormAnswerContext.Consumer>
        {({ answers }) => (
          <>
            {answers.length === 0 ? (
              <m.div key="quiz-form-no-answers" {...varFade().in}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: (theme) =>
                      `1px dashed ${theme.palette.primary.main}`,
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle2">
                    {t("quiz_form.labels.no_answers")}
                  </Typography>
                </Box>
              </m.div>
            ) : (
              <m.div key="quiz-form-no-answers" {...varFade().in}>
                <QuizFormListAnswers answers={answers} />
              </m.div>
            )}
            <AnimatePresence mode="wait">
              {answerFormView.value ? (
                <m.div key="quiz-answer-form" {...varFade().in}>
                  <QuizFormAnswer answerFormView={answerFormView} />
                </m.div>
              ) : (
                <m.div key="quiz-answer-add-button" {...varFade().in}>
                  <Stack alignItems="center">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={answerFormView.onToggle}
                    >
                      {t("quiz_form.labels.add_answer")}
                    </Button>
                  </Stack>
                </m.div>
              )}
            </AnimatePresence>
          </>
        )}
      </QuizFormAnswerContext.Consumer>
    </QuizFormAnswerProvider>
  );
};

export default QuizFormAnswerView;
