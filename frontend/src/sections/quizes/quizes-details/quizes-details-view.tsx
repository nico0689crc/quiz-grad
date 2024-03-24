"use client";

import { Stack } from "@mui/material";

import { useParams } from "@/hooks/use-params";
import { useQuiz } from "@/utils/react-query/quiz";

import { LoadingSpinner } from "@/components/loading-spinner";
import ErrorIllustration from "@/components/illustrations/error-illustration";
import QuizDetail from "./components/quiz-detail";

const QuizesDetailsView = () => {
  const { uuid: quizUUID } = useParams<{ uuid: string }>();
  const { error, isLoading, quiz } = useQuiz(quizUUID);

  return (
    <Stack flexGrow={1}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorIllustration />}
      {!isLoading && quiz && <QuizDetail quiz={quiz} />}
    </Stack>
  );
};

export default QuizesDetailsView;
