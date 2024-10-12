// import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    // {
    //   id: uuidv4(),
    //   platformName: {
    //     name: "",
    //     icon: "",
    //     value: "",
    //     url: "",
    //   },
    // },
  ],
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    addLink: (state, action) => {
      if (action.type === "link/addLink") {
        state.items.push(action.payload.item);
      }
    },
    removeLink: (state, action) => {
      if (action.type === "link/removeLink") {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.itemId
        );
      }
    },
  },
});

export const { addLink, removeLink } = linkSlice.actions;
export default linkSlice.reducer;
