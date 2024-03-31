import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useTranslate } from "@/locales";

import { Button, Container, Stack, TextField, Typography } from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useQuizContext } from "../common/playground/contexts/use-quiz-context";

const QuizesPlaygroundNewPlayer = () => {
  const { connectToRoom } = useQuizContext();
  const { t } = useTranslate();

  const schema = Yup.object().shape({
    userName: Yup.string().required(
      t("start_to_play.validation.username_required"),
    ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { userName: "" },
  });

  const { handleSubmit, register, getFieldState } = methods;

  const onSubmitHandler = useCallback(
    handleSubmit(async ({ userName }) => connectToRoom(userName)),
    [],
  );

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <Stack component="form" rowGap={3} onSubmit={onSubmitHandler}>
          <TextField
            {...register("userName")}
            label={t("start_to_play.labels.username")}
            error={!!getFieldState("userName").error}
            helperText={getFieldState("userName").error?.message}
          />

          <Button variant="contained" type="submit" color="primary">
            {t("start_to_play.labels.start")}
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
};

export default QuizesPlaygroundNewPlayer;
