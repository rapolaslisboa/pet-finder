import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "./contexts/ModalContext";
import Layout from "./hoc/Layout/Layout";
import Home from "./screens/Home/Home";

const App = (props) => {
  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  // if (props.isAuthenticated) {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact component={Home} />
  //       <Redirect to="/" />
  //     </Switch>
  //   );
  // }

  return (
    <ModalProvider>
      <div>
        <Layout>{routes}</Layout>
      </div>
    </ModalProvider>
  );
};

export default App;
