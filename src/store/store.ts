import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import uiSlice from './UI/uiSlice';
import boardsSlice from './boards/boardsSlice';
import boardSlice from './board/boardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiSlice,
    boards: boardsSlice,
    board: boardSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
