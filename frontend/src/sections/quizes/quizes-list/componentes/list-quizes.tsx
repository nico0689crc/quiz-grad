import { Quiz } from "@/types";
import { Box } from "@mui/material";
import ItemQuiz from "./item-quiz";
import { useCallback, useMemo, useState } from "react";
import { useBoolean } from "@/hooks/use-boolean";
import QuizDelete from "../../quiz-delete/quiz-delete";

type ListQuizesProps = {
  quizes: Quiz[];
};

export default function ListQuizes({ quizes }: ListQuizesProps) {
  const [quiz, setQuiz] = useState<{ quizUUID: string; title: string }>({
    quizUUID: "",
    title: "",
  });
  const viewDeleteDialog = useBoolean();

  const quizDialogContent = useMemo(
    () => <QuizDelete viewDeleteDialog={viewDeleteDialog} quiz={quiz} />,
    [quiz, viewDeleteDialog],
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
      >
        {quizes.map((quiz, index) => (
          <ItemQuiz
            key={index}
            quiz={quiz}
            viewDeleteDialog={viewDeleteDialog}
            setQuiz={setQuiz}
          />
        ))}
      </Box>
      {quizDialogContent}
    </>
  );
}
