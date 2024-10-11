import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImageUrl: null,
  name: null,
  email: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfileInfo: (state, action) => {
      if (action.payload.imageUrl || action.payload.imageUrl === null) {
        state.profileImageUrl = action.payload.imageUrl;
      }
      if (action.payload.name || action.payload.name === null) {
        state.name = action.payload.name;
      }
      if (action.payload.email || action.payload.email === null) {
        state.email = action.payload.email;
      }
    },
  },
});

export const { addProfileInfo } = profileSlice.actions;
export default profileSlice.reducer;
