import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import tabSlice from "./slice/tabSlice";
import profileSlice from "./slice/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tab: tabSlice,
    profile: profileSlice,
  },
});
