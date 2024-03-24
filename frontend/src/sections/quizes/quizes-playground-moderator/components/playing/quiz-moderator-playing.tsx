import { useMemo } from "react";
import { Box } from "@mui/material";
import { m } from "framer-motion";

import QuestionBoard from "./question-board";
import { varFade } from "@/components/animate";
import PlayersBoard from "@/sections/quizes/common/players-board";
import PositionBoard from "@/sections/quizes/common/position-board";

const QuizModeratorPlaying = () => {
  const playersBoardMemo = useMemo(() => <PlayersBoard />, []);
  const positionBoardMemo = useMemo(() => <PositionBoard />, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "", lg: "auto 1fr auto" },
        width: "100%",
        columnGap: { xs: 0, lg: 4 },
      }}
    >
      {playersBoardMemo}
      <Box
        component={m.div}
        {...varFade({ durationIn: 2.5 }).inDown}
        sx={{ width: "100%" }}
      >
        <QuestionBoard />
      </Box>
      {positionBoardMemo}
    </Box>
  );
};

export default QuizModeratorPlaying;
