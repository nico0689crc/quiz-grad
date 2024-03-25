import * as Yup from "yup";
import { useCallback } from "react";
import { Form, useForm } from "react-hook-form";
import {
  Button,
  Card,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTranslate } from "@/locales";
import LoadingButton from "@/components/loading-button/loading-button";
import { useBoolean } from "@/hooks/use-boolean";

type PropsType = {
  questionFormToggle: () => void;
};

const QuizFormQuestionForm = ({ questionFormToggle }: PropsType) => {
  const addQuestion = useBoolean(false);

  const { t } = useTranslate();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("quiz_form.validation.title_required")),
    description: Yup.string().required(
      t("quiz_form.validation.description_required"),
    ),
  });

  const {
    trigger,
    control,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  const onClickMutateQuestionHandler = useCallback(async () => {
    const result = await trigger();
  }, []);

  const onCancelHandler = useCallback(() => {
    questionFormToggle();
    reset();
  }, []);

  return (
    <Form control={control} style={{ width: "100%" }}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <TextField
          {...register("title")}
          size="small"
          label={t("quiz_form.labels.title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("description")}
          multiline
          size="small"
          maxRows={4}
          label={t("quiz_form.labels.description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />



        <Button variant="outlined">Add Answer</Button>
        <Divider sx={{ width: "100%" }} />
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button variant="outlined" size="small" onClick={onCancelHandler}>
            Cancel
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
    </Form>
  );
};

export default QuizFormQuestionForm;
