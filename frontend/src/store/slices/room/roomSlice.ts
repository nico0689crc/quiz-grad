import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Player, PlayerTypeEnum, Position, Question, Room, RoomStatusEnum } from '@/types';

type RoomState = {
  room: Room;
  loading: boolean;
};

const initialState: RoomState = {
  room: {
    roomUUID: null,
    isLastQuestion: false,
    moderator: null,
    players: [],
    positions: [],
    questionsTotal: 0,
    quiz: null,
    status: RoomStatusEnum.DOWN,
    user: null,
    isRoomOpen: false,
    showNextQuestionButton: true,
    inviteCode: null,
  },
  loading: true,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    initializeRoom: (state, action: PayloadAction<Partial<Room>>) => {
      state.room = {
        ...state.room,
        ...action.payload,
        isLastQuestion: action.payload.questionsTotal === action.payload.quiz?.questions.length ?? false,
        quiz: action.payload.quiz
          ? {
              ...action.payload.quiz,
              questions: action.payload.quiz?.questions
                ? action.payload.quiz?.questions.map((question) => ({
                    ...question,
                    showButtons: false,
                  }))
                : [],
            }
          : null,
      };
    },
    setRoomIsOpen: (state, action: PayloadAction<boolean>) => {
      state.room.isRoomOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowNextQuestionButton: (state, action: PayloadAction<boolean>) => {
      state.room.showNextQuestionButton = action.payload;
    },
    setPositions: (state, action: PayloadAction<Position[]>) => {
      state.room.positions = action.payload;
    },
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.room.players = action.payload.map((player) => ({ ...player }));
    },
    setRoomStatus: (state, action: PayloadAction<RoomStatusEnum>) => {
      state.room.status = action.payload;
    },
    updatePlayerDisconnected: (state, action: PayloadAction<string>) => {
      state.room.players = state.room.players.map((player) => ({
        ...player,
        ...(action.payload === player.playerUUID && { connected: false }),
      }));
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      if (state.room.quiz) {
        state.room.quiz.questions = state.room.quiz.questions.map((question) => ({
          ...question,
          currentQuestion: false,
          showButtons: false,
        }));

        state.room.quiz.questions.push({
          ...action.payload,
          currentQuestion: true,
          answerCorrect: false,
          showButtons: true,
          answers: action.payload.answers.map((answer) => ({
            ...answer,
            selected: false,
          })),
        });

        state.room.isLastQuestion = state.room.quiz.questions.length === state.room.questionsTotal;
      }
    },
    setIsAnswerCorrect: (state, action: PayloadAction<boolean>) => {
      const currentQuestionIndex = state.room.quiz?.questions.findIndex((question) => question.currentQuestion);

      if (state.room.quiz && currentQuestionIndex !== undefined && currentQuestionIndex > -1) {
        const currentQuestion = state.room.quiz.questions[currentQuestionIndex];
        currentQuestion.answerCorrect = action.payload;
        state.room.quiz.questions.splice(currentQuestionIndex, 1, currentQuestion);
      }
    },
    setAnswerSelected: (state, action: PayloadAction<string>) => {
      const currentQuestionIndex = state.room.quiz?.questions.findIndex((question) => question.currentQuestion);

      if (state.room.quiz && currentQuestionIndex !== undefined && currentQuestionIndex > -1) {
        const currentQuestion = state.room.quiz.questions[currentQuestionIndex];
        const answerSelectedIndex = currentQuestion.answers.findIndex((answer) => answer.answerUUID === action.payload);

        if (answerSelectedIndex !== undefined && answerSelectedIndex > -1) {
          const answerSelected = currentQuestion.answers[answerSelectedIndex];
          answerSelected.selected = true;
          currentQuestion.answers.splice(answerSelectedIndex, 1, answerSelected);
          state.room.quiz.questions.splice(currentQuestionIndex, 1, currentQuestion);
        }
      }
    },
    setShowButtons: (state, action: PayloadAction<boolean>) => {
      const currentQuestionIndex = state.room.quiz?.questions.findIndex((question) => question.currentQuestion);
      if (state.room.quiz && currentQuestionIndex !== undefined && currentQuestionIndex > -1) {
        const currentQuestion = state.room.quiz?.questions[currentQuestionIndex];
        currentQuestion.showButtons = action.payload;
        state.room.quiz?.questions.splice(currentQuestionIndex, 1, currentQuestion);
      }
    },
    resetStore: (state) => {
      state.room = {
        ...state.room,
        ...initialState.room,
      };
    },
  },
  selectors: {
    selectCurrentQuestion: (room) => room.room.quiz?.questions.find((question) => question.currentQuestion),
    selectPlayers: (room) => room.room.players.filter((player) => player.playerType !== PlayerTypeEnum.MODERATOR),
  },
});

export const {
  setLoading,
  setRoomIsOpen,
  updatePlayerDisconnected,
  addQuestion,
  setIsAnswerCorrect,
  setAnswerSelected,
  setShowButtons,
  resetStore,
  initializeRoom,
  setShowNextQuestionButton,
  setPositions,
  setPlayers,
  setRoomStatus,
} = roomSlice.actions;
export const { selectCurrentQuestion, selectPlayers } = roomSlice.selectors;
export default roomSlice.reducer;
