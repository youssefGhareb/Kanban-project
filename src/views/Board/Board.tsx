import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchBoardListsThunk,
  setCurrentSelectedCard
} from "../../store/board/boardSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./board.scss";
import AppModal from "../../UI Components/appModal/AppModal";
import { setIsViewTaskModalOpen } from "../../store/UI/uiSlice";

const Board = () => {
  const currentActiveBoard = useAppSelector(
    (state) => state.boards.currentActiveBoard
  );
  const boardLists = useSelector((state: RootState) => state.board.lists);
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.ui.theme);
  
  React.useEffect(() => {
    dispatch(fetchBoardListsThunk(currentActiveBoard.id));
  }, [currentActiveBoard]);

  return (
    <div className={theme === "light" ? "board" : "board-dark"}>
      {boardLists.map((list, index) => (
        <div className="list">
          <div className="list-title">
            <div className={`list-title-color ${"color-" + (index % 3 + 1)}`}></div>
            <div className="list-title-text">{list.name}</div>
          </div>
          {list.cards.map((card) => (
            <div
              className="appCard rounded"
              onClick={() => {
                dispatch(setIsViewTaskModalOpen(true));
                dispatch(setCurrentSelectedCard(card));
              }}
            >
              <div className="appCard-title">{card.name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
