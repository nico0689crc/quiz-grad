import { Checkbox, Chip, Stack, Typography } from "@mui/material";
import { useTranslate } from "@/locales";
import { Answer } from "@/types";
import { RootState, useAppSelector } from "@/store";
import { useQuizContext } from "./context/use-quiz-context";
import { selectCurrentQuestion } from "@/store/slices/room/roomSlice";

interface QuizAnswerItemProps {
  answer: Answer;
}

export default function QuizAnswerItem({
  answer: { content, isCorrect, answerUUID, selected },
}: QuizAnswerItemProps) {
  const { t } = useTranslate();
  const { isRoomOpen, user } = useAppSelector(
    (state: RootState) => state.room.room,
  );
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const { setAnswerSelectedHandler, isRunning } = useQuizContext();

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        borderLeftWidth: "6px",
        px: 2,
        py: 3,
        borderRadius: (theme) => theme.shape.borderRadius * 0.2,
      }}
    >
      {(!isRoomOpen || (isRoomOpen && user?.isUserModerator)) && (
        <Chip
          size="small"
          variant="outlined"
          color={isCorrect ? "success" : "error"}
          label={
            isCorrect
              ? t("common.labels.correct")
              : t("common.labels.incorrect")
          }
        />
      )}
      {isRoomOpen &&
        !user?.isUserModerator &&
        currentQuestion?.showButtons &&
        isRunning && (
          <Checkbox
            onChange={(event) =>
              setAnswerSelectedHandler(answerUUID, event.target.checked)
            }
          />
        )}
      {isRoomOpen &&
        !user?.isUserModerator &&
        !currentQuestion?.showButtons &&
        !isRunning && (
          <Chip
            size="small"
            variant="outlined"
            color={isCorrect ? "success" : "error"}
            label={
              isCorrect
                ? t("common.labels.correct")
                : t("common.labels.incorrect")
            }
          />
        )}
      <Typography variant="body1">{content}</Typography>
      {isRoomOpen &&
        !user?.isUserModerator &&
        !currentQuestion?.showButtons &&
        selected && (
          <Chip
            size="small"
            variant="outlined"
            color="success"
            label={t("playing.labels.selected")}
          />
        )}
    </Stack>
  );
}
