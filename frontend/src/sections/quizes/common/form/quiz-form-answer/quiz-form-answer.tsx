import { useCallback, useEffect } from "react";
import { Controller, Form, useForm } from "react-hook-form";

import {
  Stack,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTranslate } from "@/locales";
import { useQuizFormContext } from "../context/quiz-form-provider";

import Iconify from "@/components/iconify";

import { ReturnType } from "@/hooks/use-boolean";
import { Answer, Question } from "@/types";

type PropsType = {
  answerFormView: ReturnType;
  answer?: Partial<Answer>;
  question?: Partial<Question>;
};

const QuizFormAnswer = ({ answerFormView, answer, question }: PropsType) => {
  const { t } = useTranslate();

  const { addAnswer, updateAnswer, questionToCreate } = useQuizFormContext();

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

  useEffect(() => {
    if (answer) {
      reset({
        content: answer.content,
        isCorrect: answer.isCorrect,
      });
    }
  }, [answer]);

  const onClickMutateAnswerHandler = useCallback(async () => {
    const result = await trigger();

    console.log(answer);
    console.log(question);
    if (result) {
      answerFormView.onToggle();

      if (answer) {
        updateAnswer(
          question?.questionUUID ?? questionToCreate?.questionUUID!,
          answer.answerUUID!,
          {
            content: getValues("content"),
            isCorrect: getValues("isCorrect"),
          },
        );
      } else {
        addAnswer(question?.questionUUID! ?? questionToCreate?.questionUUID!, {
          content: getValues("content"),
          isCorrect: getValues("isCorrect"),
        });
      }

      reset();
    }
  }, [questionToCreate]);

  const onCancelHandler = useCallback(() => {
    answerFormView.onToggle();
    reset();
  }, []);

  return (
    <Form control={control} style={{ width: "100%" }}>
      <Stack
        spacing={3}
        sx={{
          ...(!answer && {
            borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 2,
          }),
        }}
      >
        <Typography variant="subtitle1">
          {answer
            ? t("quiz_form.labels.edit_answer")
            : t("quiz_form.labels.new_answer")}
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
              label={t("common.labels.correct")}
              control={
                <Controller
                  name="isCorrect"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field["value"] ?? false} />
                  )}
                />
              }
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
