import React from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setIsAddBoardModalOpen,
  setIsEditBoardModalOpen
} from "../../store/UI/uiSlice";
import AppTextField from "../../UI Components/appTextField/AppTextField";
import { useForm, useFieldArray } from "react-hook-form";
import { addBoardThunk, editBoardThunk } from "../../store/boards/boardsSlice";

const EditBoard = () => {
  type listField = {
    id: string;
    name: string;
  };
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector(
    (state) => state.boards.currentActiveBoard
  );
  const lists = useAppSelector((state) => state.board.lists);
  type Defaultvalues = {
    name: string;
    lists: listField[];
  };
  let defaultValues: Defaultvalues = {
    name: currentBoard.name,
    lists: lists
  };
  const form = useForm({ defaultValues: defaultValues });
  const { register, control, handleSubmit, formState, reset, setValue } = form;
  const { fields, append, remove } = useFieldArray({ name: "lists", control });
  const onSubmit = (data: any) => {
    dispatch(editBoardThunk(data));
    console.log(data);
  };
  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsEditBoardModalOpen(false));
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="heading-L">Edit Board</h1>
        <label>Name</label>
        <AppTextField
          type="text"
          placeholder="Enter Board Name"
          inputProps={{ ...register("name", { required: "Name is required" }) }}
        />
        <label>Columns</label>
        {fields.map((field, i) => (
          <AppTextField
            key={i}
            placeholder=""
            type="text"
            inputProps={{ ...register(`lists.${i}.name`) }}
            removable={true}
            onRemove={() => {
              remove(i);
            }}
          />
        ))}
        <button
          className="appBtn-secondary"
          style={{ marginBottom: "24px" }}
          onClick={() => {
            append({ name: "", id: "" });
          }}
          type="button"
        >
          Add New Column
        </button>
        <button className="appBtn-primary-S" type="submit">
          Save Changes
        </button>
      </form>
    </AppModal>
  );
};

export default EditBoard;
