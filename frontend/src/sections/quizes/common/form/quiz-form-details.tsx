import { ChangeEvent, useCallback } from "react";
import { Stack, Card, TextField } from "@mui/material";

import { useTranslate } from "@/locales";
import { useAppDispatch } from "@/store";
import { setDescription, setTitle } from "@/store/slices/quiz/quizSlice";
import { Form, UseFormReturn, useFormContext } from "react-hook-form";

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
  },
}: PropsType) => {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();

  const onTitleChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setTitle(event.target.value));
    },
    [],
  );

  const onDescriptionChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setDescription(event.target.value));
    },
    [],
  );

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
