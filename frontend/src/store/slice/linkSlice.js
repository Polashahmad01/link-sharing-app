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
    addFromDataBase: (state, action) => {
      if (action.type === "link/addFromDataBase") {
        const newItems = action.payload.items;

        newItems.forEach((newItem) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          );

          if (existingItemIndex !== -1) {
            state.items[existingItemIndex] = newItem;
            console.log(`Updated item with ID ${newItem.id}.`);
          } else {
            state.items.push(newItem);
            console.log(`Added new item with ID ${newItem.id}.`);
          }
        });
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

export const { addLink, addFromDataBase, removeLink } = linkSlice.actions;
export default linkSlice.reducer;
