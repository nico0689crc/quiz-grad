import { RoomStatusEnum } from "@/types";
import { useQuizContext } from "@/sections/quizes/common/context/use-quiz-context";

import QuizWaitingPlayers from "./components/waiting-players/quiz-waiting-players";
import QuizPlaying from "./components/playing/quiz-playing";
import PositionView from "../common/position-view";

const QuizesPlaygroundBoard = () => {
  const { status } = useQuizContext();
  return (
    <>
      {status === RoomStatusEnum.WAITING_PLAYERS && <QuizWaitingPlayers />}
      {status === RoomStatusEnum.PLAYING && <QuizPlaying />}
      {status === RoomStatusEnum.DONE && <PositionView />}
    </>
  );
};

export default QuizesPlaygroundBoard;
