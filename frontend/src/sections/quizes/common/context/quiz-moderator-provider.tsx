"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useTimer } from "react-timer-hook";
import { faker } from "@faker-js/faker";

import { useParams } from "@/hooks/use-params";
import {
  getQuizLocalStorageKey,
  removeStorage,
  setStorage,
  useLocalStorage,
} from "@/hooks/use-local-storage";
import { useWebSocket } from "@/websocket/use-web-socket";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  addQuestion,
  initializeRoom,
  resetStore,
  selectCurrentQuestion,
  setAnswerSelected,
  setIsAnswerCorrect,
  setLoading,
  setPlayers,
  setPositions,
  setRoomIsOpen,
  setRoomStatus,
  setShowButtons,
  setShowNextQuestionButton,
  updatePlayerDisconnected,
} from "@/store/slices/room/roomSlice";

import { setError } from "@/store/slices/common/commonSlice";

import { LocalStorageType, ParamsQuizUUID } from "@/types";
import { QuizModeratorContext } from "./quiz-moderator-context";

import { useAuthContext } from "@/components/auth/context/auth-provider";

type Props = {
  children: React.ReactNode;
};

export const QuizModeratorProvider = ({ children }: Props) => {
  const websocket = useWebSocket();
  const dispatch = useAppDispatch();
  const { uuid: quizUUID } = useParams<ParamsQuizUUID>();
  const { timer } = useAppSelector((state: RootState) => state.common);
  const question = useAppSelector(selectCurrentQuestion);
  const {
    room: { isRoomOpen, user, roomUUID, status, quiz },
    loading,
  } = useAppSelector((state: RootState) => state.room);
  const { error } = useAppSelector((state: RootState) => state.common);
  const { authenticated } = useAuthContext();

  const {
    localStorage: { accessToken },
  } = useLocalStorage<LocalStorageType>(getQuizLocalStorageKey(quizUUID), {
    accessToken: null,
  });

  const { restart, isRunning, totalSeconds } = useTimer({
    autoStart: timer.settings.autoStart,
    expiryTimestamp: timer.settings.expiryTimestamp,
    onExpire: () => {
      if (roomUUID) {
        websocket.emit.onCalculatePointsFromAnswers(
          {
            questionUUID: question?.questionUUID as string,
            roomUUID: roomUUID,
          },
          ({ confirm, positions, roomStatus }) => {
            if (confirm) {
              dispatch(setPositions(positions));
              dispatch(setRoomStatus(roomStatus));
            }
          },
        );
      }
      dispatch(setShowNextQuestionButton(true));
    },
  });

  const sendNextQuestion = useCallback(() => {
    dispatch(setShowNextQuestionButton(false));
    if (roomUUID) {
      websocket.emit.onSendNextQuestion(
        { roomUUID },
        ({ question, confirm, message }) => {
          if (confirm) {
            const expiration = new Date();
            expiration.setSeconds(
              expiration.getSeconds() + question.secondsToDeliverAnswer,
            );
            restart(expiration);
            dispatch(addQuestion(question));
          } else {
            dispatch(setError(message));
          }
        },
      );
    }
  }, [roomUUID]);

  const connectToRoom = useCallback(
    (userName: string) => {
      if (!user) {
        dispatch(setLoading(true));
        const payload = { quizUUID, userName };

        websocket.emit.onNewPlayerJoinedToRoom(payload, (response) => {
          const { player, players, room, confirm, message } = response;
          if (confirm) {
            const user = { ...player, isUserModerator: false };
            setStorage(getQuizLocalStorageKey(quizUUID), {
              accessToken: player.accessToken,
            });
            dispatch(
              initializeRoom({ ...room, user, isRoomOpen: true, players }),
            );
          } else {
            setError(message);
          }
          dispatch(setLoading(false));
        });
      }
    },
    [user, quizUUID],
  );

  const setAnswerSelectedHandler = useCallback((answerUUID: string) => {
    dispatch(setAnswerSelected(answerUUID));
  }, []);

  const sendAnswer = useCallback(() => {
    if (quiz && roomUUID && question) {
      dispatch(setLoading(true));
      dispatch(setShowButtons(false));

      const answers =
        question.answers
          .filter((answer) => answer.selected)
          .map(({ answerUUID }) => ({ answerUUID })) ?? [];

      websocket.emit.onSendAnswerQuestion(
        { roomUUID, questionUUID: question.questionUUID, answers },
        ({ isAnswerCorrect }) => {
          dispatch(setIsAnswerCorrect(isAnswerCorrect));
          dispatch(setLoading(false));
        },
      );
    }
  }, [quiz, roomUUID, question]);

  useEffect(() => {
    websocket.connection.socketConnect();

    websocket.emit.onCheckQuizRoomIsAvailable(
      { quizUUID },
      ({ confirm, message }) => {
        if (confirm) {
          dispatch(setRoomIsOpen(true));
        } else {
          dispatch(setError(message));
          dispatch(setLoading(false));
        }
      },
    );
    websocket.on.onNewPlayerJoinedNotification(({ players, positions }) => {
      console.log(positions);

      dispatch(setPositions(positions));
      dispatch(setPlayers(players));
    });
    websocket.on.onPlayerDisconnectFromRoom(({ playerUUID }) =>
      dispatch(updatePlayerDisconnected(playerUUID)),
    );

    return () => {
      websocket.connection.socketDisconnect();
      websocket.off.unMountOnNewPlayerJoinedNotification();
      websocket.off.unMountOnPlayerDisconnectFromRoom();
      dispatch(resetStore());
    };
  }, []);

  useEffect(() => {
    if (isRoomOpen) {
      if (accessToken) {
        websocket.emit.onSendAccessTokenForValidation(
          { accessToken },
          (response) => {
            const { confirm, players, room, message, player } = response;
            const user = { ...player, isUserModerator: authenticated };
            if (confirm) {
              dispatch(initializeRoom({ ...room, players, user }));
            } else {
              dispatch(setError(message));
              removeStorage(getQuizLocalStorageKey(quizUUID));
            }
            dispatch(setLoading(false));
          },
        );
      } else {
        dispatch(setLoading(false));
      }
    }
  }, [accessToken, isRoomOpen]);

  const memoizedValue = useMemo(
    () => ({
      user,
      loading,
      isRoomOpen,
      status,
      isRunning,
      totalSeconds,
      error,
      sendNextQuestion,
      connectToRoom,
      setAnswerSelectedHandler,
      sendAnswer,
    }),
    [
      user,
      loading,
      isRoomOpen,
      status,
      isRunning,
      totalSeconds,
      error,
      sendNextQuestion,
      connectToRoom,
      setAnswerSelectedHandler,
      sendAnswer,
    ],
  );

  return (
    <QuizModeratorContext.Provider value={memoizedValue}>
      {children}
    </QuizModeratorContext.Provider>
  );
};
