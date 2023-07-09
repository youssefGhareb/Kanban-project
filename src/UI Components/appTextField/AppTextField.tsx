import React, { ChangeEvent } from "react";
import "./appTextField.scss";
import close from "../../img/closeIcon.svg";
import { useAppSelector } from "../../store/hooks";

type AppTextFieldProps = {
  type: "text" | "number" | "textarea";
  placeholder: string;
  inputProps?: any;
  removable?: boolean;
  onRemove?: () => void;
};

const AppTextField = (props: AppTextFieldProps) => {
  const theme = useAppSelector((state) => state.ui.theme);
  return (
    <div className={theme === "light" ? "appTextField" : "appTextField-dark"}>
      {props.type == "textarea" ? (
        <textarea
          {...props.inputProps}
          placeholder={props.placeholder}
          rows={4}
        ></textarea>
      ) : (
        <>
          <input
            {...props.inputProps}
            type={props.type}
            placeholder={props.placeholder}
          />
          {props.removable && (
            <span onClick={props.onRemove}>
              <img src={close} />
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default AppTextField;
