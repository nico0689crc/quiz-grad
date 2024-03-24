import { Chip, Stack, Typography } from "@mui/material";
import { useTranslate } from "@/locales";
import { Answer } from "@/types";

interface QuizAnswerItemProps {
  answer: Answer;
}

export default function QuizAnswerItem({
  answer: { content, isCorrect },
}: QuizAnswerItemProps) {
  const { t } = useTranslate();

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
      <Chip
        size="small"
        variant="outlined"
        color={isCorrect ? "success" : "error"}
        label={
          isCorrect ? t("common.labels.correct") : t("common.labels.incorrect")
        }
      />
      <Typography variant="body1">{content}</Typography>
    </Stack>
  );
}
