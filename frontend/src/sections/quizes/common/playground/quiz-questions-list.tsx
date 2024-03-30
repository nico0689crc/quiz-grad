import { Question } from "@/types";
import { Stack } from "@mui/material";
import QuizQuestionItem from "./quiz-question-item";
import { AnimatePresence, m } from "framer-motion";
import { varFade } from "@/components/animate";

interface QuizQuestionsListProps {
  questions: Partial<Question>[];
  showMutationActions?: boolean;
}

export default function QuizQuestionsList({
  questions,
  showMutationActions = false,
}: QuizQuestionsListProps) {
  return (
    <Stack spacing={5}>
      <AnimatePresence>
        {questions
          .filter((question) => question.status !== "CREATING")
          .map((question, index) => (
            <m.div key={question.questionUUID} {...varFade().in}>
              <QuizQuestionItem
                key={index}
                question={question}
                index={index}
                showMutationActions={showMutationActions}
              />
            </m.div>
          ))}
      </AnimatePresence>
    </Stack>
  );
}
