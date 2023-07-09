import React, { useEffect } from "react";
import "./Sidebar.scss";
import logo from "../../../img/logo.png";
import logoLight from "../../../img/logo-light.png";
import sun from "../../../img/sunIcon.svg";
import moon from "../../../img/moonIcon.svg";
import eyeSlash from "../../../img/eye-slash.1.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setIsAddBoardModalOpen,
  setIsSidebarOpen,
  toggleTheme
} from "../../../store/UI/uiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  fetchBoardsThunk,
  setCurrentActiveBoard
} from "../../../store/boards/boardsSlice";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );
  const boards = useSelector((state: RootState) => state.boards.boards);
  const activeBoard = useSelector(
    (state: RootState) => state.boards.currentActiveBoard
  );

  const theme = useAppSelector((state) => state.ui.theme);
  const parentClass = theme == "light" ? "sidebar" : "sidebar-dark";

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, []);

  return (
    <div
      className={parentClass + ""}
      style={{ left: isSidebarOpen ? "0" : "-300px" }}
    >
      <div className={parentClass + "-body"}>
        <div className={parentClass + "-body-logo"}>
          <img src={theme === "light" ? logo : logoLight} />
        </div>
        <ul className={parentClass + "-body-boards"}>
          <h3 className="heading-S mb-4">all boards ({boards.length}) </h3>
          {boards.map((board) => (
            <li
              className={board == activeBoard ? "active" : ""}
              onClick={() => {
                dispatch(setCurrentActiveBoard(board));
              }}
            >
              {board.name}
            </li>
          ))}
        </ul>
        <div
          className={parentClass + "-body-addBoard"}
          onClick={() => {
            dispatch(setIsAddBoardModalOpen(true));
          }}
        >
          + Create New Board
        </div>
      </div>
      <div className={parentClass + "-footer"}>
        <div className={parentClass + "-footer-themeGroup"}>
          <img src={sun} alt="" />
          <div className="form-check form-switch">
            <input
              onChange={() => {
                dispatch(toggleTheme());
              }}
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
          </div>
          <img src={moon} alt="" />
        </div>
        <div
          className={parentClass + "-footer-hideGroup"}
          onClick={() => {
            dispatch(setIsSidebarOpen(false));
          }}
        >
          <img src={eyeSlash} alt="Hide Sidebar" />
          Hide Sidebar
        </div>
      </div>
    </div>
  );
};
