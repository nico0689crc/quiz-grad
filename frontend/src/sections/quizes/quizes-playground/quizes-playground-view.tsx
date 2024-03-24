"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Stack, Typography } from "@mui/material";
import { QuizProvider } from "../common/context/quiz-provider";
import { QuizContext } from "../common/context/quiz-context";
import QuizesPlaygroundNewPlayer from "./quizes-playground-new-player";
import QuizesPlaygroundBoard from "./quizes-playground-board";

export default function QuizPlaygroundView() {
  return (
    <QuizProvider>
      <QuizContext.Consumer>
        {({ loading, user, error }) => (
          <Stack
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={2}
          >
            {loading && <LoadingSpinner />}
            {!loading && error && <Typography variant="h3">{error}</Typography>}
            {!loading && !error && !user && <QuizesPlaygroundNewPlayer />}
            {!loading && !error && user && <QuizesPlaygroundBoard />}
          </Stack>
        )}
      </QuizContext.Consumer>
    </QuizProvider>
  );
}
