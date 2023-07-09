import React from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import "./Header.scss";
import logo from "../../../img/logo.png";
import logoLight from "../../../img/logo-light.png";
import dots from "../../../img/dots.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setIsAddCardModalOpen,
  setIsDeleteBoardModalOpen,
  setIsEditBoardModalOpen
} from "../../../store/UI/uiSlice";
import { Popover } from "react-tiny-popover";

const Header = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );
  const dispatch = useAppDispatch();
  const activeBoard = useSelector(
    (state: RootState) => state.boards.currentActiveBoard
  );
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const theme = useAppSelector((state) => state.ui.theme);
  const parentClass = theme == "light" ? "header" : "header-dark";

  return (
    <div
      className={parentClass}
      style={
        isSidebarOpen
          ? {
              marginLeft: "300px",
              width: "calc(100% - 300px)",
              borderLeft:
                theme === "light" ? "1px solid #E4EBFA" : "1px solid #3E3F4E"
            }
          : { width: "100%", marginLeft: 0, borderLeft: "none" }
      }
    >
      <div className={parentClass + "-title"}>
        {!isSidebarOpen && (
          <>
            <div className={parentClass + "-title-logo"}>
              <img src={theme === "light" ? logo : logoLight} alt="Kanban" />
            </div>
            <div className={parentClass + "-title-separator"}></div>
          </>
        )}
        {activeBoard.name}
      </div>
      <div className={parentClass + "-right"}>
        <button
          className="appBtn-primary-S"
          onClick={() => {
            dispatch(setIsAddCardModalOpen(true));
          }}
        >
          + Add New Task
        </button>
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "left", "right", "top"]}
          onClickOutside={() => {
            setIsPopoverOpen(false);
          }}
          content={
            <div
              className={theme === "light" ? "app-popover" : "app-popover-dark"}
            >
              <span
                onClick={() => {
                  dispatch(setIsEditBoardModalOpen(true));
                }}
              >
                Edit Board
              </span>
              <span
                className="delete"
                onClick={() => {
                  dispatch(setIsDeleteBoardModalOpen(true));
                }}
              >
                Delete Board
              </span>
            </div>
          }
        >
          <img
            src={dots}
            onClick={() => {
              setIsPopoverOpen(!isPopoverOpen);
            }}
            alt="options"
          />
        </Popover>
      </div>
    </div>
  );
};

export default Header;
