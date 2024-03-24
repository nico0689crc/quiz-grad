import { SocketContext } from "@/websocket/provider";
import { useCallback, useContext } from "react";
import {
  OnNewPlayerJoinedToRoomPayloadType,
  OnNewPlayerJoinedToRoomCallbackType,
  OnNewPlayerJoinedToRoomResponseType,
  OnCheckQuizRoomIsAvailablePayloadType,
  OnCheckQuizRoomIsAvailableCallbackType,
  OnCheckQuizRoomIsAvailableResponseType,
  OnSendAccessTokenForValidationPayloadType,
  OnSendAccessTokenForValidationCallbackType,
  OnSendAccessTokenForValidationResponseType,
  OnOpenRoomToPlayPayloadType,
  OnOpenRoomToPlayCallbackType,
  OnOpenRoomToPlayResponseType,
  OnSendNextQuestionPayloadType,
  OnSendNextQuestionCallbackType,
  OnSendNextQuestionResponseType,
  OnSendAnswerQuestionPayloadType,
  OnSendAnswerQuestionCallbackType,
  OnSendAnswerQuestionResponseType,
  OnCalculatePointsFromAnswersPayloadType,
  OnCalculatePointsFromAnswersCallbackType,
  OnCalculatePointsFromAnswersResponseType,
  OnNewPlayerJoinedNotificationCallbackType,
  OnNewPlayerJoinedNotificationResponseType,
  OnNextQuestionCallbackType,
  OnNextQuestionResponseType,
  OnPlayerDisconnectFromRoomCallbackType,
  OnPlayerDisconnectFromRoomResponseType,
} from "./types";

export const useWebSocket = () => {
  const socket = useContext(SocketContext);

  // --------------------- Connection --------------------- //

  const socketConnect = useCallback(() => socket.connect(), []);
  const socketDisconnect = useCallback(() => socket.disconnect(), []);

  // --------------------- Emit --------------------- //

  const onNewPlayerJoinedToRoom = useCallback(
    (
      payload: OnNewPlayerJoinedToRoomPayloadType,
      callback: OnNewPlayerJoinedToRoomCallbackType,
    ) => {
      socket.emit(
        "onNewPlayerJoinedToRoom",
        payload,
        (response: OnNewPlayerJoinedToRoomResponseType) => callback(response),
      );
    },
    [],
  );

  const onSendAccessTokenForValidation = useCallback(
    (
      payload: OnSendAccessTokenForValidationPayloadType,
      callback: OnSendAccessTokenForValidationCallbackType,
    ) => {
      socket.emit(
        "onSendAccessTokenForValidation",
        payload,
        (response: OnSendAccessTokenForValidationResponseType) =>
          callback(response),
      );
    },
    [],
  );

  const onCheckQuizRoomIsAvailable = useCallback(
    (
      payload: OnCheckQuizRoomIsAvailablePayloadType,
      callback: OnCheckQuizRoomIsAvailableCallbackType,
    ) => {
      socket.emit(
        "onCheckQuizRoomIsAvailable",
        payload,
        (response: OnCheckQuizRoomIsAvailableResponseType) =>
          callback(response),
      );
    },
    [],
  );

  const onOpenRoomToPlay = useCallback(
    (
      payload: OnOpenRoomToPlayPayloadType,
      callback: OnOpenRoomToPlayCallbackType,
    ) => {
      socket.emit(
        "onOpenRoomToPlay",
        payload,
        (response: OnOpenRoomToPlayResponseType) => callback(response),
      );
    },
    [],
  );

  const onSendNextQuestion = useCallback(
    (
      payload: OnSendNextQuestionPayloadType,
      callback: OnSendNextQuestionCallbackType,
    ) => {
      socket.emit(
        "onSendNextQuestion",
        payload,
        (response: OnSendNextQuestionResponseType) => callback(response),
      );
    },
    [],
  );

  const onSendAnswerQuestion = useCallback(
    (
      payload: OnSendAnswerQuestionPayloadType,
      callback: OnSendAnswerQuestionCallbackType,
    ) => {
      socket.emit(
        "onSendAnswerQuestion",
        payload,
        (response: OnSendAnswerQuestionResponseType) => callback(response),
      );
    },
    [],
  );

  const onCalculatePointsFromAnswers = useCallback(
    (
      payload: OnCalculatePointsFromAnswersPayloadType,
      callback: OnCalculatePointsFromAnswersCallbackType,
    ) => {
      socket.emit(
        "onCalculatePointsFromAnswers",
        payload,
        (response: OnCalculatePointsFromAnswersResponseType) =>
          callback(response),
      );
    },
    [],
  );

  // --------------------- On --------------------- //

  const onNewPlayerJoinedNotification = useCallback(
    (callback: OnNewPlayerJoinedNotificationCallbackType) => {
      socket.on(
        "onNewPlayerJoinedNotification",
        (response: OnNewPlayerJoinedNotificationResponseType) =>
          callback(response),
      );
    },
    [],
  );

  const onNextQuestion = useCallback((callback: OnNextQuestionCallbackType) => {
    socket.on("onNextQuestion", (response: OnNextQuestionResponseType) =>
      callback(response),
    );
  }, []);

  const onPlayerDisconnectFromRoom = useCallback(
    (callback: OnPlayerDisconnectFromRoomCallbackType) => {
      socket.on(
        "onPlayerDisconnectFromRoom",
        (response: OnPlayerDisconnectFromRoomResponseType) =>
          callback(response),
      );
    },
    [],
  );

  // --------------------- Off --------------------- //

  const unMountOnNewPlayerJoinedNotification = useCallback(
    () => socket.off("onNewPlayerJoinedNotification"),
    [],
  );
  const unMountOnPlayerDisconnectFromRoom = useCallback(
    () => socket.off("onPlayerDisconnectFromRoom"),
    [],
  );
  const unMountOnNextQuestion = useCallback(
    () => socket.off("onNextQuestion"),
    [],
  );

  return {
    connection: {
      socketConnect,
      socketDisconnect,
    },
    emit: {
      onNewPlayerJoinedToRoom,
      onCheckQuizRoomIsAvailable,
      onSendAccessTokenForValidation,
      onOpenRoomToPlay,
      onSendNextQuestion,
      onSendAnswerQuestion,
      onCalculatePointsFromAnswers,
    },
    on: {
      onNewPlayerJoinedNotification,
      onPlayerDisconnectFromRoom,
      onNextQuestion,
    },
    off: {
      unMountOnNewPlayerJoinedNotification,
      unMountOnPlayerDisconnectFromRoom,
      unMountOnNextQuestion,
    },
  };
};
