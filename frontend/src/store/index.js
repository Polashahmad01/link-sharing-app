import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import tabSlice from "./slice/tabSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tab: tabSlice,
  },
});
