import { AnimatePresence, m } from "framer-motion";
import { useBoolean } from "@/hooks/use-boolean";
import QuizFormQuestionForm from "./quiz-form-question-form";
import QuizFormQuestionButton from "./quiz-form-question-button";
import { varFade } from "@/components/animate";

const QuizFormQuestionCreateView = () => {
  const questionFormVisible = useBoolean(false);

  return (
    <AnimatePresence mode="wait">
      {questionFormVisible.value ? (
        <m.div key="question-form" {...varFade().in}>
          <QuizFormQuestionForm
            questionFormToggle={() => questionFormVisible.onToggle()}
          />
        </m.div>
      ) : (
        <m.div key="question-add-button" {...varFade().in}>
          <QuizFormQuestionButton
            questionFormToggle={() => questionFormVisible.onToggle()}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default QuizFormQuestionCreateView;
