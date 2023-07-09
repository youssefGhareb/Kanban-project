import React, { PropsWithChildren } from "react";
import "./appModal.scss";
import { useAppSelector } from "../../store/hooks";

type ModalProps = {
  closeFunction: () => void;
};

const AppModal = (props: PropsWithChildren<ModalProps>) => {
  const theme = useAppSelector((state) => state.ui.theme);
  return (
    <>
      <div className={theme === "light" ? "appModal" : "appModal-dark"}>{props.children}</div>
      <div className="overlay" onClick={props.closeFunction}></div>
    </>
  );
};

export default AppModal;
