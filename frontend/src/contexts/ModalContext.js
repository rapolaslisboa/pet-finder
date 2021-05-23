import React, { createContext, useContext, useState } from "react";
import PetFormulary from "../containers/PetFormulary/PetFormulary";
import SignIn from "../containers/SignIn/SignIn";
import SignUp from "../containers/SignUp/SignUp";

const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(<SignIn />);
  const [modalType, setModalType] = useState("SignIn");
  const modalContents = {
    SignIn: <SignIn />,
    SignUp: <SignUp />,
    PetFormulary: <PetFormulary />,
  };

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const handleModalContent = (type) => {
    setModalContent(modalContents[type]);
    setModalType(type);
  };

  return (
    <ModalContext.Provider
      value={{
        visible,
        openModal,
        closeModal,
        modalContent,
        modalType,
        handleModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
};

export { useModalContext, ModalProvider };
