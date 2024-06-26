"use client";

import { Stack } from "@mui/material";

import { LoadingSpinner } from "@/components/loading-spinner";

import StartToPlay from "./components/start-to-play/start-to-play";
import QuizModeratorBoard from "./components/quiz-moderator-board";
import { QuizProvider } from "../common/playground/contexts/quiz-provider";
import { QuizContext } from "../common/playground/contexts/quiz-context";

const QuizesPlaygroundModeratorView = () => {
  return (
    <QuizProvider>
      <QuizContext.Consumer>
        {({ loading, user, isRoomOpen }) => (
          <Stack
            spacing={2}
            direction="row"
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
          >
            {loading && <LoadingSpinner />}
            {!loading && (!isRoomOpen || (isRoomOpen && !user)) && (
              <StartToPlay />
            )}
            {!loading && isRoomOpen && user && <QuizModeratorBoard />}
          </Stack>
        )}
      </QuizContext.Consumer>
    </QuizProvider>
  );
};

export default QuizesPlaygroundModeratorView;
