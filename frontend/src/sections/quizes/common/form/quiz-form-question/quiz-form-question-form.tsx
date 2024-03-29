import * as Yup from "yup";
import { useCallback } from "react";
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
import { useAppDispatch } from "@/store";
import { addQuestionToQuiz } from "@/store/slices/quiz/quizSlice";

type PropsType = {
  questionFormToggle: () => void;
};

const QuizFormQuestionForm = ({ questionFormToggle }: PropsType) => {
  const addQuestion = useBoolean(false);
  const dispatch = useAppDispatch();

  const { t } = useTranslate();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("quiz_form.validation.title_required")),
    description: Yup.string().required(
      t("quiz_form.validation.description_required"),
    ),
    secondsToDeliverAnswer: Yup.number().min(0).default(() => 45)
  });

  const {
    trigger,
    control,
    formState: { errors },
    register,
    reset,
    getValues
  } = useForm<{ title: string, description: string, secondsToDeliverAnswer: number }>({
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  const onClickMutateQuestionHandler = useCallback(async () => {
    const result = await trigger();
    if (result) {
      dispatch(addQuestionToQuiz({
        title: getValues('title'),
        description: getValues('description'),
        secondsToDeliverAnswer: getValues('secondsToDeliverAnswer')
      }))
    }
  }, []);

  const onCancelHandler = useCallback(() => {
    questionFormToggle();
    reset();
  }, []);

  return (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Form control={control} style={{ width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1">
            {t("quiz_form.labels.new_question")}
          </Typography>
          <Stack direction='row' spacing={1}>
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

      <QuizFormAnswer />

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
          label={t("quiz_form.labels.create_quiz_button")}
          loadingLabel={t("quiz_form.labels.create_quiz_button_loading")}
        />
      </Stack>
    </Stack>
  );
};

export default QuizFormQuestionForm;
