import { Question } from "@/types";
import { Stack } from "@mui/material";
import QuizQuestionItem from "../../common/playground/quiz-question-item";

interface QuizQuestionsListProps {
  questions: Question[];
}

export default function QuizQuestionsList({
  questions,
}: QuizQuestionsListProps) {
  return (
    <Stack spacing={5}>
      {questions.map((question, index) => (
        <QuizQuestionItem key={index} question={question} index={index} />
      ))}
    </Stack>
  );
}
