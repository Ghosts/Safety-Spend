import React from "react";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <Main />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
