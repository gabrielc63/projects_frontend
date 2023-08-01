import { createSlice } from "@reduxjs/toolkit";
// import data from "../data/data.json";
//data.boards
const boardsSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setData } = boardsSlice.actions;
export default boardsSlice;
