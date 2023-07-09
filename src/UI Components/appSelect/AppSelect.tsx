import React, { ChangeEvent } from "react";
import "./appSelect.scss";
import { useAppSelector } from "../../store/hooks";

type AppSelectProps = {
  options: any[];
  label: string;
  selectProps?: any;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const AppSelect = (props: AppSelectProps) => {
    const theme = useAppSelector((state) => state.ui.theme);

  return (
    <div className={theme === "light" ? "appSelect": "appSelect-dark"}>
      <label className={theme === "dark" ? "text-white": ""}>{props.label}</label>
      {props.selectProps ? (
        <select {...props.selectProps}>
          {props.options.map((option) => (
            <option value={option.id}>{option.name}</option>
          ))}
        </select>
      ) : (
        <select onChange={props.onChange}>
          {props.options.map((option) => (
            <option value={option.id}>{option.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AppSelect;
