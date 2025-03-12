import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { CustomError } from "../type";

export interface NotificationState {
  error: CustomError | null;
}

const initialState: NotificationState = {
  error: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<CustomError>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = notificationSlice.actions;

export const selectError = (state: RootState) => state.notification.error;

export default notificationSlice.reducer;
