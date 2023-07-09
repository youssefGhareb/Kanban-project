import React from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsDeleteBoardModalOpen, setIsDeleteTaskModalOpen } from "../../store/UI/uiSlice";
import { deleteBoardThunk } from "../../store/boards/boardsSlice";
import { useSelector } from "react-redux";
import { deleteTaskThunk } from "../../store/board/boardSlice";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector((state)=>state.board.currentSelectedCard);
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsDeleteTaskModalOpen(false));
      }}
    >
      <h1 className="heading-L danger">Delete this board?</h1>
      <p className="text-L gray-text mb-4">
        Are you sure you want to delete the {activeTask.name} task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="d-flex gap-3">
        <button
          className="appBtn-destructive"
          onClick={() => {
            dispatch(deleteTaskThunk(activeTask.id));
          }}
        >
          Delete
        </button>
        <button
          className={
            theme === "light" ? "appBtn-secondary" : "appBtn-secondary-dark"
          }
          onClick={() => {
            dispatch(setIsDeleteTaskModalOpen(false));
          }}
        >
          Cancel
        </button>
      </div>
    </AppModal>
  );
};

export default DeleteTask;
