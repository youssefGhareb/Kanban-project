import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  setIsDeleteBoardModalOpen,
  setIsEditBoardModalOpen
} from "../UI/uiSlice";

export interface board {
  id: string;
  name: string;
  desc?: string;
  url: string;
}

export interface boardsState {
  boards: board[];
  currentActiveBoard: board;
}

interface listName {
  name: string;
}

interface listNameID {
  name: string;
  id: string;
}

interface addBoardRequestData {
  boardName: string;
  lists: listName[];
}

interface editBoardRequestData {
  name: string;
  lists: listNameID[];
}

const initialState: boardsState = {
  boards: [],
  currentActiveBoard: {
    id: "",
    name: "",
    url: ""
  }
};

export const fetchBoardsThunk = createAsyncThunk(
  "boards/fetchBoards",
  async (_, thunkAPI): Promise<board[]> => {
    const response = await fetch(
      "https://api.trello.com/1/members/me/boards?key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349"
    );
    const data = await response.json();
    if (data) {
      thunkAPI.dispatch(setCurrentActiveBoard(data[0]));
    }
    return data;
  }
);

export const deleteBoardThunk = createAsyncThunk(
  "boards/deleteBoard",
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const response = await fetch(
      `https://api.trello.com/1/boards/${state.boards.currentActiveBoard.id}?key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
      { method: "delete" }
    );
    if (response) {
      thunkAPI.dispatch(fetchBoardsThunk());
      thunkAPI.dispatch(setIsDeleteBoardModalOpen(false));
    }
  }
);

export const addBoardThunk = createAsyncThunk(
  "boards/addBoard",
  async (board: addBoardRequestData, thunkAPI) => {
    const response = await fetch(
      `https://api.trello.com/1/boards/?name=${board.boardName}&defaultLists=false&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
      { method: "post" }
    );
    const data = await response.json();
    if (data) {
      let ok = true;
      board.lists.forEach(async (list) => {
        const response = await fetch(
          `https://api.trello.com/1/lists?name=${list.name}&idBoard=${data.id}&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
          { method: "post" }
        );
        if (!response) {
          ok = false;
        }
      });

      if (ok) {
        thunkAPI.dispatch(fetchBoardsThunk());
      }
    }
  }
);

export const editBoardThunk = createAsyncThunk(
  "boards/editBoard",
  async (board: editBoardRequestData, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    let success = true;
    if (board.name != state.boards.currentActiveBoard.name) {
      const response = fetch(
        `https://api.trello.com/1/boards/${state.boards.currentActiveBoard.id}?key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
        { method: "put" }
      );
      if (!response) {
        success = false;
      }
    }
    board.lists.forEach(async (list) => {
      let found = false;
      state.board.lists.forEach(async (listInState) => {
        if (list.id == listInState.id) {
          found = true;
          if (list.name != listInState.name) {
            const response = await fetch(
              `https://api.trello.com/1/lists/${list.id}?name=${list.name}&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
              { method: "put" }
            );
            if (!response) {
              success = false;
            }
          }
        }
      });
      if (!found) {
        const response = await fetch(
          `https://api.trello.com/1/lists?name=${list.name}&idBoard=${state.boards.currentActiveBoard.id}&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
          { method: "post" }
        );
        if (!response) {
          success = false;
        }
      }
    });
    state.board.lists.forEach(async (listInState) => {
      let found = false;
      board.lists.forEach((list) => {
        if (list.id === listInState.id) {
          found = true;
        }
      });
      if (!found) {
        const response = await fetch(
          `https://api.trello.com/1/lists/${listInState.id}?closed=true&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
          { method: "put" }
        );
        if (!response) {
          success = false;
        }
      }
    });
    if (success) {
      thunkAPI.dispatch(setIsEditBoardModalOpen(false));
      thunkAPI.dispatch(fetchBoardsThunk());
    }
  }
);

export const boardsSlice = createSlice({
  name: "Boards",
  initialState: initialState,
  reducers: {
    setCurrentActiveBoard: (state, action: PayloadAction<board>) => {
      state.currentActiveBoard = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardsThunk.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
  }
});

export const { setCurrentActiveBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
