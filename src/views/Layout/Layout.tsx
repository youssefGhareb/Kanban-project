import React from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Layout.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Header from "./Header/Header";
import eye from "../../img/eyeIcon.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsSidebarOpen } from "../../store/UI/uiSlice";
import Board from "../Board/Board";
import AppModal from "../../UI Components/appModal/AppModal";
import AddTask from "../AddTask/AddTask";
import AddBoard from "../AddBoard/AddBoard";
import DeleteBoard from "../DeleteBoard/DeleteBoard";
import ViewTask from "../ViewTask/ViewTask";
import EditTask from "../EditTask/EditTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import EditBoard from "../EditBoard/EditBoard";

export const Layout = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );
  const isAddModalOpen = useSelector(
    (state: RootState) => state.ui.isAddCardModalOpen
  );
  const isAddBoardModalOpen = useSelector(
    (state: RootState) => state.ui.isAddBoardModalOpen
  );
  const isDeleteBoardModalOpen = useSelector(
    (state: RootState) => state.ui.isDeleteBoardModalOpen
  );
  const isViewTaskModalOpen = useSelector(
    (state:RootState) => state.ui.isViewTaskModalOpen
  );
  const isEditTaskModalOpen = useSelector(
    (state:RootState) => state.ui.isEditTaskModalOpen
  );
  const isDeleteTaskModalOpen = useSelector(
    (state:RootState) => state.ui.isDeleteTaskModalOpen
  );
  const isEditBoardModalOpen = useSelector(
    (state:RootState) => state.ui.isEditBoardModalOpen
  );
  const theme = useAppSelector((state) => state.ui.theme);

  const dispatch = useAppDispatch();
  return (
    <div className={theme === "dark" ? "Layout-dark" : "Layout"}>
      <Sidebar />
      {!isSidebarOpen && (
        <div
          className="sidebarOpen"
          onClick={() => {
            dispatch(setIsSidebarOpen(true));
          }}
        >
          <img src={eye} alt="open sidebar" />
        </div>
      )}
      <Header />
      <div
        className="main"
        style={isSidebarOpen ? { marginLeft: "300px" } : { marginLeft: "0px" }}
      >
        <Board />
      </div>
      {isAddModalOpen && <AddTask />}
      {isAddBoardModalOpen && <AddBoard />}
      {isDeleteBoardModalOpen && <DeleteBoard />}
      {isViewTaskModalOpen && <ViewTask />}
      {isEditTaskModalOpen && <EditTask />}
      {isDeleteTaskModalOpen && <DeleteTask />}
      {isEditBoardModalOpen && <EditBoard />}
    </div>
  );
};
