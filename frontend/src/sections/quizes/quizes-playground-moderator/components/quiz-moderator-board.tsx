import { RoomStatusEnum } from "@/types";
import QuizModeratorPlaying from "./playing/quiz-moderator-playing";
import QuizModeratorWaitingPlayers from "./waiting-players/quiz-moderator-waiting-players";

import { useQuizContext } from "../../common/context/use-quiz-context";
import PositionView from "../../common/position-view";

const QuizModeratorBoard = () => {
  const { status } = useQuizContext();
  return (
    <>
      {status === RoomStatusEnum.WAITING_PLAYERS && (
        <QuizModeratorWaitingPlayers />
      )}

      {status === RoomStatusEnum.PLAYING && <QuizModeratorPlaying />}
      {status === RoomStatusEnum.DONE && <PositionView />}
    </>
  );
};
export default QuizModeratorBoard;
