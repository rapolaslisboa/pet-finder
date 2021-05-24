import React from "react";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Logo}>
        <NavigationItem link="/">
          <font>
            <i className="fas fa-paw" />
          </font>
        </NavigationItem>
      </div>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
