import { Answer } from "@/types";
import { Stack } from "@mui/material";
import QuizAnswerItem from "./quiz-answer-item";

interface QuizAnswersListProps {
  answers: Answer[];
}

export default function QuizAnswersList({ answers }: QuizAnswersListProps) {
  return (
    <Stack spacing={3}>
      {answers.map((answer, index) => (
        <QuizAnswerItem key={index} answer={answer} />
      ))}
    </Stack>
  );
}
