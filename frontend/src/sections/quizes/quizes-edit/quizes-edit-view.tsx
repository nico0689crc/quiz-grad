"use client";
import { Stack } from "@mui/material";

import { useParams } from "@/hooks/use-params";
import { useQuiz } from "@/utils/react-query/quiz";

import { LoadingSpinner } from "@/components/loading-spinner";
import ErrorIllustration from "@/components/illustrations/error-illustration";
import { QuizFormProvider } from "../common/form/context/quiz-form-provider";
import QuizEdit from "./components/quiz-edit";

const QuizesEditView = () => {
  const { uuid: quizUUID } = useParams<{ uuid: string }>();
  const { error, isLoading, quiz } = useQuiz(quizUUID);

  return (
    <Stack flexGrow={1}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorIllustration />}
      {!isLoading && quiz && (
        <QuizFormProvider>
          <QuizEdit quiz={quiz} />
        </QuizFormProvider>
      )}
    </Stack>
  );
};

export default QuizesEditView;
