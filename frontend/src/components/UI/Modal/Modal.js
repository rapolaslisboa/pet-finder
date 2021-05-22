import React from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import { useModalContext } from "../../../contexts/ModalContext";

const Modal = (props) => {
  let attachedClasses = [classes.Modal];
  if (props.type !== undefined) {
    attachedClasses = [classes.Modal, classes[props.type]];
  }

  const { visible, closeModal } = useModalContext();
  return (
    <Auxiliary>
      <Backdrop visible={visible} clicked={closeModal} />
      <div
        className={attachedClasses.join(" ")}
        style={{
          opacity: visible ? "1" : "0",
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <div className={classes.Close} onClick={closeModal}>
          <i className="fas fa-times"></i>
        </div>
        {props.children}
      </div>
    </Auxiliary>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
