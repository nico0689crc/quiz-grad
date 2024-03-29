import { AnimatePresence, m } from "framer-motion";
import { Answer } from "@/types";

import QuizFormItemAnswer from "./quiz-form-item-answer";
import { varFade } from "@/components/animate";
import { Stack } from "@mui/material";

type PropsTypes = {
  answers: Partial<Answer>[];
};

const QuizFormListAnswers = ({ answers }: PropsTypes) => {
  return (
    <Stack spacing={2}>
      <AnimatePresence>
        {answers.map((answer, index) => (
          <m.div key={answer.answerUUID} {...varFade().in}>
            <QuizFormItemAnswer
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
