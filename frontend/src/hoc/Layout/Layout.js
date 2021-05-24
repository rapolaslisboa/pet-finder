import React, { useState } from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Modal from "../../components/UI/Modal/Modal";
import { useModalContext } from "../../contexts/ModalContext";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  const { modalContent, modalType } = useModalContext();

  return (
    <Auxiliary>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
      <Modal type={modalType}>{modalContent}</Modal>
    </Auxiliary>
  );
};

export default Layout;
