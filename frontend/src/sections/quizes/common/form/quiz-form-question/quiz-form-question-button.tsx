import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";
import { Card, Stack, Typography } from "@mui/material";

type PropsType = {
  questionFormToggle: () => void;
};

const QuizFormQuestionButton = ({ questionFormToggle }: PropsType) => {
  const { t } = useTranslate();
  return (
    <Stack
      component={Card}
      direction="row"
      spacing={1}
      onClick={questionFormToggle}
      sx={{
        p: 2,
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Iconify
        icon="mingcute:add-line"
        sx={{ color: (theme) => theme.palette.primary.main }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        {t("quiz_form.labels.add_question_button")}
      </Typography>
    </Stack>
  );
};

export default QuizFormQuestionButton;
