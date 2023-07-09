import React from "react";
import AppModal from "../../UI Components/appModal/AppModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAddCardModalOpen, setIsEditTaskModalOpen } from "../../store/UI/uiSlice";
import AppTextField from "../../UI Components/appTextField/AppTextField";
import AppSelect from "../../UI Components/appSelect/AppSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useForm } from "react-hook-form";
import { addTaskToListThunk, updateTaskThunk } from "../../store/board/boardSlice";

const EditTask = () => {
  const dispatch = useAppDispatch();
  const boardLists = useSelector((state: RootState) => state.board.lists);
  const activeTask = useSelector((state:RootState)=>state.board.currentSelectedCard);
  let defaultValues = {
    name: activeTask.name,
    description: activeTask.desc,
    list: activeTask.idList
  };
  const form = useForm({ defaultValues: defaultValues });
  const { register, control, handleSubmit, formState, reset, setValue } = form;
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      updateTaskThunk({id:activeTask.id, name: data.name, desc: data.description, idList: data.list})
    );
  };
  return (
    <AppModal
      closeFunction={() => {
        dispatch(setIsEditTaskModalOpen(false));
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="heading-L">Edit Task</h1>
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
          Save Changes
        </button>
      </form>
    </AppModal>
  );
};

export default EditTask;
