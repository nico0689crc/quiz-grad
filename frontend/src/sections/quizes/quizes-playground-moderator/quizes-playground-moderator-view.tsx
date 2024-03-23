'use client';

import { Stack } from '@mui/material';

import { LoadingSpinner } from '@/components/loading-spinner';

import StartToPlay from './components/start-to-play/start-to-play';
import QuizModeratorBoard from './components/quiz-moderator-board';
import { QuizModeratorProvider } from '../common/context/quiz-moderator-provider';
import { QuizModeratorContext } from '../common/context/quiz-moderator-context';

const QuizesPlaygroundModeratorView = () => {
  return (
    <QuizModeratorProvider>
      <QuizModeratorContext.Consumer>
        {({ loading, user, isRoomOpen }) => (
          <Stack spacing={2} direction='row' flexGrow={1} alignItems='center'>
            {loading && <LoadingSpinner />}
            {!loading && (!isRoomOpen || (isRoomOpen && !user)) && <StartToPlay />}
            {!loading && isRoomOpen && user && <QuizModeratorBoard />}
          </Stack>
        )}
      </QuizModeratorContext.Consumer>
    </QuizModeratorProvider>
  );
};

export default QuizesPlaygroundModeratorView;
