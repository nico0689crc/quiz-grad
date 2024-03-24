import { AnimatePresence, m } from "framer-motion";
import { useQuizModeratorContext } from "../common/context/use-quiz-moderator-context";
import { Box } from "@mui/material";
import { varFade } from "@/components/animate";
import QuizModeratorWaitingPlayers from "./components/waiting-players/quiz-moderator-waiting-players";
import { RoomStatusEnum } from "@/types";
import QuizModeratorPlaying from "./components/playing/quiz-moderator-playing";

const QuizesPlaygroundBoard = () => {
  const { status } = useQuizModeratorContext();
  return (
    <>
      <AnimatePresence>
        {status === RoomStatusEnum.WAITING_PLAYERS && (
          <Box
            component={m.div}
            {...varFade({ durationOut: 1 }).inDown}
            sx={{ width: "100%" }}
          >
            <QuizModeratorWaitingPlayers />
          </Box>
        )}

        {status === RoomStatusEnum.PLAYING && (
          <Box
            component={m.div}
            {...varFade({ durationIn: 2, distance: 300 }).inDown}
            sx={{ width: "100%" }}
          >
            <QuizModeratorPlaying />
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizesPlaygroundBoard;
