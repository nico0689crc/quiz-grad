import { useMemo } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayersBoard from "@/sections/quizes/common/players-board";
import PositionBoard from "@/sections/quizes/common/position-board";
import QuestionBoard from "./question-board";

const QuizPlaying = () => {
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const playersBoardMemo = useMemo(() => <PlayersBoard />, []);
  const positionBoardMemo = useMemo(() => <PositionBoard />, []);

  return (
    <Box
      sx={{
        width: "100%",
        ...(isUpLg && {
          display: "grid",
          gridTemplateColumns: { xs: "", lg: "auto 1fr auto" },
          columnGap: { xs: 0, lg: 4 },
        }),
        ...(!isUpLg && {
          position: "relative",
        }),
      }}
    >
      {playersBoardMemo}
      <QuestionBoard />
      {positionBoardMemo}
    </Box>
  );
};

export default QuizPlaying;
