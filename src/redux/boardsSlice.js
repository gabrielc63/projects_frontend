import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../constants/apiRoutes";
// import data from "../data/data.json";

function buildUrl(endpoint) {
  return config.url.BASE_URL + endpoint;
}

export const addBoardAsync = createAsyncThunk(
  "boards/addBoardAsync",
  async (boardData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(boardData),
    };

    const response = await fetch(
      buildUrl(config.url.CREATE_BOARD_URL),
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);

export const getBoards = createAsyncThunk("boards/getBoards", async () => {
  try {
    const response = await fetch(buildUrl(config.url.BOARDS_INDEX_URL));

    if (!response.ok) {
      // Handle errors if the response is not successful
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

export const updateListAsync = createAsyncThunk(
  "lists/updateListAsync",
  async (listData) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listData),
    };
    const id = listData.list.id;

    const response = await fetch(
      buildUrl(config.url.UPDATE_LIST_URL + `/${id}`),
      requestOptions
    );
    const data = await response.json();
    return data;
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: { boardItems: [], status: "idle", error: null },
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        lists: [],
      };
      board.lists = payload.newLists;
      state.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.lists = payload.newLists;
    },
    setBoardActive: (state, action) => {
      state.boardItems.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.boardItems = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBoardAsync.fulfilled, (state, action) => {
        state.boardItems.push(action.payload);
      })
      .addCase(updateListAsync.fulfilled, (state, action) => {
        const board = state.boardItems.find(
          (arrayItem) => arrayItem.id === action.payload.board_id
        );
        let updatedLists = board.lists.filter(
          (item) => item.id !== action.payload.id
        );
        updatedLists.push(action.payload);
        board.lists = updatedLists;
      });
  },
});

export default boardsSlice;
