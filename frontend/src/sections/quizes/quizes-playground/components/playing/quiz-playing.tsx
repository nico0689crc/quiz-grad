import { useMemo } from "react";
import { Box } from "@mui/material";
import { m } from "framer-motion";

import PlayersBoard from "@/sections/quizes/common/players-board";
import PositionBoard from "@/sections/quizes/common/position-board";
import QuestionBoard from "./question-board";
import { varFade } from "@/components/animate";

const QuizPlaying = () => {
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
      <QuestionBoard />
      {positionBoardMemo}
    </Box>
  );
};

export default QuizPlaying;
