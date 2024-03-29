import { Form, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslate } from "@/locales";
import { useCallback, useContext } from "react";
import LoadingButton from "@/components/loading-button/loading-button";
import { addQuestion } from "@/store/slices/room/roomSlice";
import {
  Stack,
  Card,
  Typography,
  TextField,
  Divider,
  Button,
  IconButton,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ReturnType } from "@/hooks/use-boolean";
import Iconify from "@/components/iconify";
import { QuizFormAnswerContext } from "../context/quiz-form-answer-context";

type PropsType = {
  answerFormView: ReturnType;
};

const QuizFormAnswer = ({ answerFormView }: PropsType) => {
  const { t } = useTranslate();
  const { addAnswer } = useContext(QuizFormAnswerContext);

  const schema = Yup.object().shape({
    content: Yup.string().required(t("quiz_form.validation.title_required")),
    isCorrect: Yup.boolean().default(() => false),
  });

  const {
    trigger,
    control,
    formState: { errors },
    register,
    reset,
    getValues,
  } = useForm<{ content: string; isCorrect: boolean }>({
    resolver: yupResolver(schema),
    defaultValues: { content: "", isCorrect: false },
  });

  const onClickMutateAnswerHandler = useCallback(async () => {
    const result = await trigger();
    if (result) {
      addAnswer({
        content: getValues("content"),
        isCorrect: getValues("isCorrect"),
      });
      answerFormView.onToggle();
      reset();
    }
  }, []);

  const onCancelHandler = useCallback(() => {
    answerFormView.onToggle();
    reset();
  }, []);

  return (
    <Form control={control} style={{ width: "100%" }}>
      <Stack
        spacing={3}
        sx={{
          borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
          pl: 2,
          py: 2,
        }}
      >
        <Typography variant="subtitle1">
          {t("quiz_form.labels.new_answer")}
        </Typography>
        <Stack
          direction={{ sx: "column", md: "row" }}
          gap={0}
          justifyContent="end"
          alignItems={{ sx: "center", md: "start" }}
        >
          <Stack
            sx={{ flexGrow: 1 }}
            direction={{ sx: "column", md: "row" }}
            gap={2}
            justifyContent="end"
            alignItems={{ sx: "center", md: "start" }}
          >
            <TextField
              {...register("content")}
              size="small"
              label={t("quiz_form.labels.answer_content")}
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{ flexGrow: 1 }}
            />
            <FormControlLabel
              control={<Checkbox {...register("isCorrect")} />}
              label={t("common.labels.correct")}
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="end"
            alignItems={{ sx: "center", md: "start" }}
          >
            <Tooltip title={t("common.labels.save")} placement="top">
              <IconButton
                aria-label="delete"
                color="success"
                onClick={onClickMutateAnswerHandler}
              >
                <Iconify icon="dashicons:saved" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("common.labels.cancel")} placement="top">
              <IconButton
                aria-label="delete"
                color="error"
                onClick={onCancelHandler}
              >
                <Iconify icon="material-symbols:close" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Form>
  );
};

export default QuizFormAnswer;
