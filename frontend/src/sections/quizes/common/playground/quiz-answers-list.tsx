import { Answer } from "@/types";
import { Box, Card, Stack, Typography } from "@mui/material";
import QuizAnswerItem from "./quiz-answer-item";
import { useTranslate } from "@/locales";

interface QuizAnswersListProps {
  answers: Partial<Answer>[];
}

export default function QuizAnswersList({ answers }: QuizAnswersListProps) {
  const { t } = useTranslate();
  return answers?.length > 0 ? (
    <Stack spacing={3}>
      {answers.map((answer, index) => (
        <QuizAnswerItem key={index} answer={answer} />
      ))}
    </Stack>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle2">
        {t("quiz_form.labels.no_answers")}
      </Typography>
    </Box>
  );
}
