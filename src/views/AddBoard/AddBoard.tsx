import React from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddBoardModalOpen } from "../../store/UI/uiSlice";
import AppTextField from "../../UI Components/appTextField/AppTextField";
import { useForm, useFieldArray } from "react-hook-form";
import { addBoardThunk } from "../../store/boards/boardsSlice";

const AddBoard = () => {
  const theme = useAppSelector((state) => state.ui.theme);

  type listField = {
    name: string;
  };
  const dispatch = useAppDispatch();
  type Defaultvalues = {
    name: string;
    lists: listField[];
  };
  let defaultValues: Defaultvalues = {
    name: "",
    lists: [{ name: "todo" }, { name: "doing" }, { name: "done" }]
  };
  const form = useForm({ defaultValues: defaultValues });
  const { register, control, handleSubmit, formState, reset, setValue } = form;
  const { fields, append, remove } = useFieldArray({ name: "lists", control });
  const onSubmit = (data: any) => {
    dispatch(addBoardThunk({ boardName: data.name, lists: data.lists }));
    console.log(data);
  };
  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsAddBoardModalOpen(false));
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="heading-L">Add New Board</h1>
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
          className={
            theme === "light" ? "appBtn-secondary" : "appBtn-secondary-dark"
          }
          style={{ marginBottom: "24px" }}
          onClick={() => {
            append({ name: "" });
          }}
          type="button"
        >
          Add New Column
        </button>
        <button className="appBtn-primary-S" type="submit">
          Create New Board
        </button>
      </form>
    </AppModal>
  );
};

export default AddBoard;
