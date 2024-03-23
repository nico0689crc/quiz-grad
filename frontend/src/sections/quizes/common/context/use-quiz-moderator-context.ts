import { useContext } from 'react';
import { QuizModeratorContext } from './quiz-moderator-context';

export const useQuizModeratorContext = () => {
  const context = useContext(QuizModeratorContext);

  if (!context) {
    throw new Error('useQuizModeratorContext context must be use inside QuizModeratorProvider');
  }

  return context;
};
