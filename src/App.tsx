import React from "react";
import { Header } from "./components/header/Header";
import { Switch, Route } from "react-router-dom";
import { UsersList } from "./components/main/UsersList";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={UsersList} />
      </Switch>
    </div>
  );
};

export default App;
