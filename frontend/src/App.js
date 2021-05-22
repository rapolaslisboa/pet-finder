import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./contexts/AuthContext";
import Layout from "./hoc/Layout/Layout";
import Home from "./screens/Home/Home";
import Management from "./screens/Management/Management";

const App = () => {
  const { isAuthenticated } = useAuthContext();
  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/gerenciamento" component={Management} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default App;
