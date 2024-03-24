"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Stack, Typography } from "@mui/material";
import { QuizModeratorProvider } from "../common/context/quiz-moderator-provider";
import { QuizModeratorContext } from "../common/context/quiz-moderator-context";
import QuizesPlaygroundNewPlayer from "./quizes-playground-new-player";
import QuizesPlaygroundBoard from "./quizes-playground-board";

export default function QuizPlaygroundView() {
  return (
    <QuizModeratorProvider>
      <QuizModeratorContext.Consumer>
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

            {/* {!loading && !error && (
              <>
                {!user && <QuizesPlaygroundNewPlayer />}
                {user && (
                  <Stack direction='row' spacing={3}>
                    <Typography>{`Status - ${status}`}</Typography>
                    <Typography>Players</Typography>
                    <Stack component={Card}>
                      {players.map((player) => (
                        <Typography key={player.playerUUID} variant='body1' color={player.connected ? 'green' : 'red'}>
                          {player.userName}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                )}
                {isRunning && <Typography component={Box}>Seconds {totalSeconds}</Typography>}
                {question && (
                  <Stack spacing={3}>
                    <Typography variant='h5'>{question.title}</Typography>
                    <Typography variant='body1'>{question.description}</Typography>
                    <Stack>
                      {question.answers.map((answer) => (
                        <Stack
                          key={answer.answerUUID}
                          component={Card}
                          p={3}
                          {...(!isRunning && {
                            sx: { border: `2px solid ${answer.isCorrect ? 'green' : 'red'}` },
                          })}
                        >
                          <Stack direction='row' justifyContent='space-between'>
                            {answer.content}
                            {answer.selected && <Typography>Selected</Typography>}
                            {!answer.selected && question.showButtons && (
                              <Button onClick={() => setAnswerSelectedHandler(answer.answerUUID)}>Select</Button>
                            )}
                          </Stack>
                        </Stack>
                      ))}
                      {question.showButtons && <Button onClick={() => sendAnswer()}>Send Answer</Button>}
                    </Stack>

                    {!isRunning && question.answerCorrect && <Typography color={'green'}>Correct</Typography>}
                    {!isRunning && !question.answerCorrect && <Typography color={'red'}>Incorrect</Typography>}
                  </Stack>
                )}
              </>
            )} */}
          </Stack>
        )}
      </QuizModeratorContext.Consumer>
    </QuizModeratorProvider>
  );
}
