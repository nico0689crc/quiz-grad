import { RoomStatusEnum } from "@/types";
import QuizModeratorPlaying from "./playing/quiz-moderator-playing";
import QuizModeratorWaitingPlayers from "./waiting-players/quiz-moderator-waiting-players";

import { useQuizContext } from "../../common/playground/contexts/use-quiz-context";
import PositionView from "../../common/playground/position-view";

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
