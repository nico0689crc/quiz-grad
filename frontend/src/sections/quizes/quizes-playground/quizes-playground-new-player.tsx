import { Button } from '@mui/material';
import { useQuizModeratorContext } from '../common/context/use-quiz-moderator-context';

const QuizesPlaygroundNewPlayer = () => {
  const { connectToRoom } = useQuizModeratorContext();

  return (
    <Button variant='outlined' onClick={() => connectToRoom()}>
      Create user
    </Button>
  );
};

export default QuizesPlaygroundNewPlayer;
