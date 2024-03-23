import { AnimatePresence, m } from 'framer-motion';
import { RoomStatusEnum } from '@/types';
import QuizModeratorPlaying from './playing/quiz-moderator-playing';
import QuizModeratorWaitingPlayers from './waiting-players/quiz-moderator-waiting-players';
import { varFade } from '@/components/animate';
import { Box } from '@mui/material';
import { useQuizModeratorContext } from '../../common/context/use-quiz-moderator-context';

const QuizModeratorBoard = () => {
  const { status } = useQuizModeratorContext();
  return (
    <>
      <AnimatePresence>
        {status === RoomStatusEnum.WAITING_PLAYERS && (
          <Box component={m.div} {...varFade({ durationOut: 1 }).inDown} sx={{ width: '100%' }}>
            <QuizModeratorWaitingPlayers />
          </Box>
        )}

        {status === RoomStatusEnum.PLAYING && (
          <Box component={m.div} {...varFade({ durationIn: 2, distance: 300 }).inDown} sx={{ width: '100%' }}>
            <QuizModeratorPlaying />
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};
export default QuizModeratorBoard;
