import * as Yup from "yup";
import { useCallback, useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import {
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslate } from "@/locales";
import LoadingButton from "@/components/loading-button/loading-button";
import { useBoolean } from "@/hooks/use-boolean";
import QuizFormAnswer from "../quiz-form-answer";
import { useQuizFormContext } from "../context/quiz-form-provider";
import { Question } from "@/types";

type PropsType = {
  questionFormToggle: () => void;
  question?: Partial<Question>;
};

const QuizFormQuestionForm = ({ questionFormToggle, question }: PropsType) => {
  const { t } = useTranslate();
  const addQuestion = useBoolean(false);
  const {
    questionToCreate,
    removeQuestion,
    updateQuestion: updateQuestionMutation,
  } = useQuizFormContext();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("quiz_form.validation.title_required")),
    description: Yup.string().required(
      t("quiz_form.validation.description_required"),
    ),
    secondsToDeliverAnswer: Yup.number()
      .min(0)
      .default(() => 45),
  });

  const {
    trigger,
    control,
    formState: { errors },
    register,
    reset,
    getValues,
  } = useForm<{
    title: string;
    description: string;
    secondsToDeliverAnswer: number;
  }>({
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  const onClickMutateQuestionHandler = useCallback(async () => {
    const result = await trigger();

    if (result) {
      updateQuestionMutation(
        question?.questionUUID ?? (questionToCreate?.questionUUID as string),
        {
          status: "CREATED",
          title: getValues("title"),
          secondsToDeliverAnswer: getValues("secondsToDeliverAnswer"),
          description: getValues("description"),
        },
      );
      questionFormToggle();
      reset();
    }
  }, []);

  const onCancelHandler = useCallback(() => {
    !question && removeQuestion(questionToCreate?.questionUUID!);
    questionFormToggle();
    reset();
  }, [questionToCreate?.questionUUID]);

  useEffect(() => {
    question &&
      reset({
        ...question,
      });
  }, []);

  return (
    <>
      <Form control={control} style={{ width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1">
            {question
              ? t("quiz_form.labels.edit_question")
              : t("quiz_form.labels.new_question")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              {...register("title")}
              size="small"
              label={t("quiz_form.labels.title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              {...register("secondsToDeliverAnswer")}
              size="small"
              label={t("quiz_form.labels.seconds_to_deliver_answer")}
              defaultValue={45}
              error={!!errors.secondsToDeliverAnswer}
              helperText={errors.secondsToDeliverAnswer?.message}
              type="number"
            />
          </Stack>
          <TextField
            {...register("description")}
            multiline
            size="small"
            maxRows={4}
            label={t("quiz_form.labels.description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Stack>
      </Form>

      <QuizFormAnswer question={question! ?? questionToCreate!} />

      <Divider sx={{ width: "100%" }} />

      <Stack direction="row" justifyContent="end" spacing={2}>
        <Button variant="outlined" size="small" onClick={onCancelHandler}>
          {t("common.labels.cancel")}
        </Button>
        <LoadingButton
          disabled={addQuestion.value}
          size="small"
          variant="contained"
          onClick={onClickMutateQuestionHandler}
          color="primary"
          label={
            question
              ? t("quiz_form.labels.edit_question")
              : t("quiz_form.labels.add_question_button")
          }
          loadingLabel={t("common.labels.creating")}
        />
      </Stack>
    </>
  );
};

export default QuizFormQuestionForm;
