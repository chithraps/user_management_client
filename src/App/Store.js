import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlices";
import adminReducer from "../Features/AdminSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin:adminReducer,
  },
});
