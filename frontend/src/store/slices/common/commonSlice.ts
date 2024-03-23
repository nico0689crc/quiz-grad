import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Common } from '@/types';

const initialState: Common = {
  error: null,
  timer: {
    settings: {
      autoStart: false,
      expiryTimestamp: new Date(),
    },
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = commonSlice.actions;
export default commonSlice.reducer;
