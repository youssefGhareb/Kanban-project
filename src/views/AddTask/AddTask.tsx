import React from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddCardModalOpen } from "../../store/UI/uiSlice";
import AppTextField from "../../UI Components/appTextField/AppTextField";
import AppSelect from "../../UI Components/appSelect/AppSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import { addTaskToListThunk } from "../../store/board/boardSlice";

const AddTask = () => {
  const dispatch = useAppDispatch();
  const boardLists = useSelector((state: RootState) => state.board.lists);
  let defaultValues = {
    name: "",
    description: "",
    list: boardLists[0].id
  };
  const form = useForm({ defaultValues: defaultValues });
  const { register, control, handleSubmit, formState, reset, setValue } = form;
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(addTaskToListThunk({ listID: data.list, taskName: data.name, taskDescription: data.description }));
  };
  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsAddCardModalOpen(false));
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="heading-L">Add Task</h1>
        <AppTextField
          type="text"
          placeholder="Enter Task Name"
          inputProps={{ ...register("name", { required: "Name is required" }) }}
        />
        <AppTextField
          type="textarea"
          placeholder="Enter Task Description"
          inputProps={{
            ...register("description", { required: "description is required" })
          }}
        />
        <AppSelect
          label="Status"
          options={boardLists}
          selectProps={{
            ...register("list", { required: "List is required" })
          }}
        />
        <button className="appBtn-primary-S" type="submit">
          Create Task
        </button>
      </form>
    </AppModal>
  );
};

export default AddTask;
