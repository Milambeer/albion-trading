import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filtersSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
