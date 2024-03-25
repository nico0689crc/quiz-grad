import { useBoolean } from "@/hooks/use-boolean";
import QuizFormQuestionForm from "./quiz-form-question-form";
import QuizFormQuestionButton from "./quiz-form-question-button";

const QuizFormQuestionCreateView = () => {
  const questionFormVisible = useBoolean(false);

  return (
    <>
      {questionFormVisible.value ? (
        <QuizFormQuestionForm
          questionFormToggle={() => questionFormVisible.onToggle()}
        />
      ) : (
        <QuizFormQuestionButton
          questionFormToggle={() => questionFormVisible.onToggle()}
        />
      )}
    </>
  );
};

export default QuizFormQuestionCreateView;
