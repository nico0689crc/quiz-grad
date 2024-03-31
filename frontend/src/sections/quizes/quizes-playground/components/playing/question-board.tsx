import { Button, Divider, Stack, Typography } from "@mui/material";
import QuizQuestionItem from "@/sections/quizes/common/playground/quiz-question-item";
import { RootState, useAppSelector } from "@/store";
import { selectCurrentQuestion } from "@/store/slices/room/roomSlice";
import { useTranslate } from "@/locales";
import { useQuizContext } from "@/sections/quizes/common/playground/contexts/use-quiz-context";

const QuestionBoard = () => {
  const { t } = useTranslate();
  const question = useAppSelector(selectCurrentQuestion);
  const { quiz, questionsTotal } = useAppSelector(
    (state: RootState) => state.room.room,
  );
  const { isRunning, totalSeconds } = useQuizContext();

  return (
    <Stack spacing={3}>
      {quiz && (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            alignItems={{ xs: "flex-start", lg: "center" }}
            spacing={1}
          >
            <Typography
              variant="h5"
              sx={{
                color: (theme) => theme.palette.primary.main,
                textDecoration: "underline",
              }}
            >
              Quiz:
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              {quiz.title}
            </Typography>
          </Stack>
          {isRunning && (
            <Stack direction="row" spacing={1}>
              <Typography
                variant="h5"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  textDecoration: "underline",
                }}
              >
                {t("common.labels.time_left")}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: (theme) => theme.palette.text.primary }}
              >{`${totalSeconds} ${t("common.labels.seconds")}`}</Typography>
            </Stack>
          )}
          <Stack direction="row" spacing={1}>
            <Typography
              variant="h5"
              sx={{
                color: (theme) => theme.palette.primary.main,
                textDecoration: "underline",
              }}
            >
              {t("common.labels.question")}:
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: (theme) => theme.palette.text.primary }}
            >{`${quiz.questions.length}/${questionsTotal}`}</Typography>
          </Stack>
        </Stack>
      )}
      <Divider sx={{ width: "100%" }} />
      {question && (
        <QuizQuestionItem question={question} showCollapse={false} />
      )}
    </Stack>
  );
};

export default QuestionBoard;
