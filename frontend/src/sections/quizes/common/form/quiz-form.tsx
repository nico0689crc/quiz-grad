import * as Yup from "yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTranslate } from "@/locales";
import LoadingButton from "@/components/loading-button/loading-button";

import QuizFormDetails from "./quiz-form-details";
import QuizFormQuestionCreateView from "./quiz-form-question/quiz-form-question-view";
import QuizFormListQuestions from "./quiz-form-list-questions";
import { useQuizFormContext } from "./context/quiz-form-provider";
import { useCreateQuiz } from "@/utils/react-query/quiz";

const QuizForm = () => {
  const { t } = useTranslate();
  const { title, description, questions } = useQuizFormContext();
  const { createQuiz, isLoading } = useCreateQuiz();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("quiz_form.validation.title_required")),
    description: Yup.string().required(
      t("quiz_form.validation.description_required"),
    ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  const onClickMutateQuizHandler = useCallback(async () => {
    const result = await methods.trigger();

    if (result) {
      createQuiz({
        title,
        description,
        questions: questions.map((question) => ({
          ...question,
          secondsToDeliverAnswer: +question.secondsToDeliverAnswer!,
          answers: question?.answers?.map((answer) => ({
            ...answer,
          })),
        })),
      });
    }
  }, [title, description, questions]);

  return (
    <Stack spacing={3}>
      <Divider sx={{ width: "100%" }}>
        <Typography variant="subtitle1">Quiz's details</Typography>
      </Divider>
      <QuizFormDetails methods={methods} />
      <Divider sx={{ width: "100%" }}>
        <Typography variant="subtitle1">Questions</Typography>
      </Divider>
      <QuizFormListQuestions />
      <QuizFormQuestionCreateView />
      <Stack alignItems="center">
        <LoadingButton
          disabled={isLoading}
          variant="contained"
          onClick={onClickMutateQuizHandler}
          color="primary"
          label={t("quiz_form.labels.create_quiz_button")}
          loadingLabel={t("quiz_form.labels.create_quiz_button_loading")}
        />
      </Stack>
    </Stack>
  );
};

export default QuizForm;
