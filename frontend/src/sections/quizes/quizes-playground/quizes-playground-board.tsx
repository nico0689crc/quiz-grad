import { RoomStatusEnum } from "@/types";
import { useQuizContext } from "@/sections/quizes/common/context/use-quiz-context";

import QuizWaitingPlayers from "./components/waiting-players/quiz-waiting-players";
import QuizPlaying from "./components/playing/quiz-playing";

const QuizesPlaygroundBoard = () => {
  const { status } = useQuizContext();
  return (
    <>
      {status === RoomStatusEnum.WAITING_PLAYERS && (
        <QuizWaitingPlayers />
      )}
      {status === RoomStatusEnum.PLAYING && (
        <QuizPlaying />
      )}
    </>
  );
};

export default QuizesPlaygroundBoard;
