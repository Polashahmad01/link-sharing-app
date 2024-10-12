import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import tabSlice from "./slice/tabSlice";
import profileSlice from "./slice/profileSlice";
import linkSlice from "./slice/linkSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tab: tabSlice,
    profile: profileSlice,
    links: linkSlice,
  },
});
