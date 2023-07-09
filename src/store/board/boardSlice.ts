import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  setIsAddCardModalOpen,
  setIsDeleteTaskModalOpen,
  setIsEditTaskModalOpen,
  setIsViewTaskModalOpen
} from "../UI/uiSlice";

export interface card {
  id: string;
  name: string;
  desc?: string;
  idList?: string;
}

export interface list {
  id: string;
  name: string;
  cards: card[];
}

export interface boardState {
  id: string;
  name: string;
  lists: list[];
  currentSelectedCard: card;
}

export interface AddTaskRequestData {
  listID: string;
  taskName: string;
  taskDescription?: string;
}

const initialState: boardState = {
  id: "",
  name: "",
  lists: [],
  currentSelectedCard: { id: "", name: "", desc: "" }
};

export const fetchBoardListsThunk = createAsyncThunk(
  "board/fetchLists",
  async (boardID: string, thunkAPI): Promise<list[]> => {
    const response = await fetch(
      `https://api.trello.com/1/boards/${boardID}/lists?cards=all&card_fields=id,name,desc&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`
    );
    const data = await response.json();
    return data;
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "board/deleteTask",
  async (taskID: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const response = await fetch(
      `https://api.trello.com/1/cards/${taskID}?key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
      { method: "delete" }
    );
    if (response) {
      thunkAPI.dispatch(setIsDeleteTaskModalOpen(false));
      thunkAPI.dispatch(
        fetchBoardListsThunk(state.boards.currentActiveBoard.id)
      );
    }
  }
);

export const addTaskToListThunk = createAsyncThunk(
  "board/addTask",
  async (data: AddTaskRequestData, thunkAPI) => {
    const response = await fetch(
      `https://api.trello.com/1/cards?idList=${data.listID}&name=${
        data.taskName
      }&${
        data.taskDescription ? "description=" + data.taskDescription : ""
      }&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
      { method: "post" }
    );
    const jsonData = await response.json();
    const state: RootState = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setIsAddCardModalOpen(false));
    thunkAPI.dispatch(fetchBoardListsThunk(state.boards.currentActiveBoard.id));
    console.log(jsonData);
  }
);

export const updateTaskThunk = createAsyncThunk(
  "board/editTask",
  async (card: card, thunkAPI) => {
    console.log(card);
    const state: RootState = thunkAPI.getState() as RootState;
    let response;
    if (state.ui.isViewTaskModalOpen) {
      response = await fetch(
        `https://api.trello.com/1/cards/${card.id}?idList=${card.idList}&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
        { method: "put" }
      );
    } else {
      response = await fetch(
        `https://api.trello.com/1/cards/${card.id}?idList=${card.idList}&name=${card.name}&desc=${card.desc}&key=20e338316a2ac14565a2855524053361&token=ATTA5ecdcf503465e25e90450ff66a5d89e4837bb190b95933d13a622f5782e5df1fB3750349`,
        { method: "put" }
      );
    }
    if (response) {
      thunkAPI.dispatch(setIsViewTaskModalOpen(false));
      thunkAPI.dispatch(setIsEditTaskModalOpen(false));
      thunkAPI.dispatch(
        fetchBoardListsThunk(state.boards.currentActiveBoard.id)
      );
    }
  }
);

export const boardSlice = createSlice({
  name: "Board",
  initialState: initialState,
  reducers: {
    setCurrentSelectedCard: (state, action: PayloadAction<card>) => {
      state.currentSelectedCard = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBoardListsThunk.fulfilled,
      (state, action: PayloadAction<list[]>) => {
        state.lists = action.payload;
      }
    );
  }
});

export const { setCurrentSelectedCard } = boardSlice.actions;

export default boardSlice.reducer;
