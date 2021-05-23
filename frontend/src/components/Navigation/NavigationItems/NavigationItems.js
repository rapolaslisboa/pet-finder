import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useModalContext } from "../../../contexts/ModalContext";
import { useAuthContext } from "../../../contexts/AuthContext";

const NavigationItems = () => {
  const { openModal, handleModalContent } = useModalContext();
  const { setIsAuthenticated, isAuthenticated, setUserCity, setUserEmail } =
    useAuthContext();
  return (
    <ul className={classes.NavigationItems}>
      {!isAuthenticated ? (
        <>
          <font
            onClick={() => {
              openModal();
              handleModalContent("SignIn");
            }}
          >
            <span>Entrar</span>
            <i className="fas fa-sign-in-alt"></i>
          </font>
        </>
      ) : (
        <>
          <NavigationItem link="/gerenciamento">Gerenciamento</NavigationItem>
          <font
            onClick={() => {
              setIsAuthenticated(false);
              setUserCity(null);
              setUserEmail(null);
              alert("Você deslogou!");
            }}
          >
            <span>Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </font>
          <button
            className={classes.Button}
            onClick={() => {
              openModal();
              handleModalContent("PetFormulary");
            }}
          >
            Anunciar
          </button>
        </>
      )}
    </ul>
  );
};

export default NavigationItems;
