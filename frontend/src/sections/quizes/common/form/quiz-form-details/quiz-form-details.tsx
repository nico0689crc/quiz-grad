import { ChangeEvent, useCallback, useEffect } from "react";
import { Form, UseFormReturn } from "react-hook-form";
import { Stack, Card, TextField } from "@mui/material";
import { useTranslate } from "@/locales";
import { useQuizFormContext } from "../context/quiz-form-provider";

type FieldsType = {
  title: string;
  description: string;
};

type PropsType = {
  methods: UseFormReturn<FieldsType, any, undefined>;
};

const QuizFormDetails = ({
  methods: {
    control,
    register,
    formState: { errors },
    reset,
  },
}: PropsType) => {
  const { t } = useTranslate();
  const { setDetails, title, description } = useQuizFormContext();

  const onTitleChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDetails({ title: event.target.value });
    },
    [],
  );

  const onDescriptionChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDetails({ description: event.target.value });
    },
    [],
  );

  useEffect(() => {
    reset({ title, description });
  }, [title, description]);

  return (
    <Form control={control}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <TextField
          {...register("title")}
          label={t("quiz_form.labels.title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          onChange={(event) => onTitleChangeHandler(event)}
        />
        <TextField
          {...register("description")}
          multiline
          maxRows={4}
          label={t("quiz_form.labels.description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          onChange={(event) => onDescriptionChangeHandler(event)}
        />
      </Stack>
    </Form>
  );
};

export default QuizFormDetails;
