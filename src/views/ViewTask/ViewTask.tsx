import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsDeleteTaskModalOpen,
  setIsEditTaskModalOpen,
  setIsViewTaskModalOpen
} from "../../store/UI/uiSlice";
import AppSelect from "../../UI Components/appSelect/AppSelect";
import { updateTaskThunk } from "../../store/board/boardSlice";
import dots from "../../img/dots.svg";
import { Popover } from "react-tiny-popover";

const ViewTask = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dispatch = useAppDispatch();
  const activeCard = useAppSelector((state) => state.board.currentSelectedCard);
  const boardLists = useAppSelector((state) => state.board.lists);
    const theme = useAppSelector((state) => state.ui.theme);


  const modal = useRef<HTMLDivElement>(null);
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newListID = e.target.value;
    dispatch(updateTaskThunk({ ...activeCard, idList: newListID }));
  };
  useEffect(() => {
    console.log(modal.current);
  }, []);
  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsViewTaskModalOpen(false));
      }}
    >
      <div
        ref={modal}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <h1 className="heading-L mb-0">{activeCard.name}</h1>
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "left", "right", "top"]}
          reposition={false}
          onClickOutside={() => {
            setIsPopoverOpen(false);
          }}
          boundaryElement={modal.current!}
          content={
            <div
              className={
                theme === "light" ? "modal-app-popover" : "modal-app-popover-dark"
              }
            >
              <span
                onClick={() => {
                  dispatch(setIsViewTaskModalOpen(false));
                  dispatch(setIsEditTaskModalOpen(true));
                }}
              >
                Edit Task
              </span>
              <span
                className="delete"
                onClick={() => {
                  dispatch(setIsViewTaskModalOpen(false));
                  dispatch(setIsDeleteTaskModalOpen(true));
                }}
              >
                Delete Task
              </span>
            </div>
          }
        >
          <img
            src={dots}
            alt="options"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsPopoverOpen(true);
            }}
          />
        </Popover>
      </div>
      {activeCard.desc ? (
        <p className={"text-L" + theme === "dark" ? "gray-text" : "gray-text"}>
          {activeCard.desc}
        </p>
      ) : (
        ""
      )}
      <AppSelect
        label="Current Status"
        options={boardLists}
        onChange={onSelectChange}
      />
    </AppModal>
  );
};

export default ViewTask;
