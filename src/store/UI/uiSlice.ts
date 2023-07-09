import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface uiState {
  theme: "light" | "dark";
  isSidebarOpen: boolean;
  isAddCardModalOpen: boolean;
  isAddBoardModalOpen: boolean;
  isDeleteBoardModalOpen: boolean;
  isViewTaskModalOpen: boolean;
  isEditTaskModalOpen: boolean;
  isDeleteTaskModalOpen: boolean;
  isEditBoardModalOpen: boolean;
}

const initialState: uiState = {
  theme: "light",
  isSidebarOpen: true,
  isAddCardModalOpen: false,
  isAddBoardModalOpen: false,
  isDeleteBoardModalOpen: false,
  isViewTaskModalOpen: false,
  isEditTaskModalOpen: false,
  isDeleteTaskModalOpen: false,
  isEditBoardModalOpen: false
};

export const uiSlice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setIsAddCardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddCardModalOpen = action.payload;
    },
    setIsAddBoardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddBoardModalOpen = action.payload;
    },
    setIsDeleteBoardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteBoardModalOpen = action.payload;
    },
    setIsViewTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isViewTaskModalOpen = action.payload;
    },
    setIsEditTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditTaskModalOpen = action.payload;
    },
    setIsDeleteTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteTaskModalOpen = action.payload;
    },
    setIsEditBoardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditBoardModalOpen = action.payload;
    },
    toggleTheme: (state) => {
      if (state.theme == "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    }
  }
});

export const {
  setIsSidebarOpen,
  setIsAddCardModalOpen,
  setIsAddBoardModalOpen,
  setIsDeleteBoardModalOpen,
  setIsViewTaskModalOpen,
  setIsEditTaskModalOpen,
  setIsDeleteTaskModalOpen,
  setIsEditBoardModalOpen,
  toggleTheme
} = uiSlice.actions;

export default uiSlice.reducer;
