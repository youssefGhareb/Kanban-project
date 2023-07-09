import React from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsDeleteBoardModalOpen } from "../../store/UI/uiSlice";
import { deleteBoardThunk } from "../../store/boards/boardsSlice";

const DeleteBoard = () => {
  const dispatch = useAppDispatch();
  const selectedBoardTitle = useAppSelector(
    (state) => state.boards.currentActiveBoard.name
  );
  const theme = useAppSelector((state) => state.ui.theme);


  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsDeleteBoardModalOpen(false));
      }}
    >
      <h1 className="heading-L danger">Delete this board?</h1>
      <p className="text-L gray-text mb-4">
        Are you sure you want to delete the {selectedBoardTitle} board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="d-flex gap-3">
        <button
          className="appBtn-destructive"
          onClick={() => {
            dispatch(deleteBoardThunk());
          }}
        >
          Delete
        </button>
        <button
          className={
            theme === "light" ? "appBtn-secondary" : "appBtn-secondary-dark"
          }
          onClick={() => {
            dispatch(setIsDeleteBoardModalOpen(false));
          }}
        >
          Cancel
        </button>
      </div>
    </AppModal>
  );
};

export default DeleteBoard;
