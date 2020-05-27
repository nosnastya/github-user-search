import React from "react";
import { Nav } from "./components/Nav";
import { Switch, Route } from "react-router-dom";
import { UsersList } from "./components/UsersList";
import "./styles/styles.scss";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" exact component={UsersList} />
      </Switch>
    </div>
  );
};

export default App;
