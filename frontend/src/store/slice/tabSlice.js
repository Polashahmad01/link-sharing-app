import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "profile",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    tabHandler: (state, action) => {
      state.activeTab = action.payload.tabName;
    },
  },
});

export const { tabHandler } = tabSlice.actions;
export default tabSlice.reducer;
