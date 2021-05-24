import React from "react";
import { useModalContext } from "../../../contexts/ModalContext";
import { usePetContext } from "../../../contexts/PetContext";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const { visible, closeModal } = useModalContext();
  const { setIsEditable } = usePetContext();

  let attachedClasses = [classes.Modal];
  if (props.type !== undefined) {
    attachedClasses = [classes.Modal, classes[props.type]];
  }

  const handleCloseModal = () => {
    setIsEditable(false);
    closeModal();
  };

  return (
    <Auxiliary>
      <Backdrop visible={visible} clicked={handleCloseModal} />
      <div
        className={attachedClasses.join(" ")}
        style={{
          opacity: visible ? "1" : "0",
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <div className={classes.Close} onClick={handleCloseModal}>
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
