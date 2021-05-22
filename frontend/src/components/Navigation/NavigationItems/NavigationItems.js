import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useModalContext } from "../../../contexts/ModalContext";

const NavigationItems = () => {
  const { openModal, handleModalContent } = useModalContext();
  return (
    <ul className={classes.NavigationItems}>
      {/* <div className={classes.Categories}>
        <NavigationItem link="/area-restrita/" exact>
          <i className="fas fa-user-edit" />
          Gerenciamento
        </NavigationItem>
        <div className={classes.HorizontalRule}></div>
      </div> */}
      <font
        onClick={() => {
          openModal();
          handleModalContent("SignIn");
        }}
      >
        <span>Gerenciamento</span>
      </font>
      <font
        onClick={() => {
          openModal();
          handleModalContent("SignIn");
        }}
      >
        <span>Entrar</span>
        <i className="fas fa-sign-in-alt"></i>
      </font>
      <button className={classes.Button}>Anunciar</button>
      {/* {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>} */}
    </ul>
  );
};

export default NavigationItems;
