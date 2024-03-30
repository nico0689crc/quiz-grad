import { AnimatePresence, m } from "framer-motion";
import { Question } from "@/types";

import QuizFormItemAnswer from "./quiz-form-item-answer";
import { varFade } from "@/components/animate";
import { Stack } from "@mui/material";

type PropsTypes = {
  question: Partial<Question>;
};

const QuizFormListAnswers = ({ question }: PropsTypes) => {
  return (
    <Stack spacing={2}>
      <AnimatePresence>
        {question?.answers &&
          question.answers.map((answer, index) => (
            <m.div key={answer.answerUUID} {...varFade().in}>
              <QuizFormItemAnswer
                question={question}
                key={answer.answerUUID}
                answer={answer}
                index={index}
              />
            </m.div>
          ))}
      </AnimatePresence>
    </Stack>
  );
};

export default QuizFormListAnswers;
