import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { commonSlice } from './slices/common/commonSlice';
import { roomSlice } from './slices/room/roomSlice';
import { quizSlice } from './slices/quiz/quizSlice';
export { useAppDispatch, useAppSelector, useAppStore } from './hooks';

const rootReducer = combineSlices(commonSlice, roomSlice, quizSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
