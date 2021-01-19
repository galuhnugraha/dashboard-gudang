import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../pages/Login/Login";
import {Register} from "../pages/Register/Register";
import {App} from "../pages/App/App";

export const MainRoutes = () => {
  return <Switch>
    <Route path="/" exact>
      <Redirect to={"/app/dashboard"}/>
    </Route>
    <Route path="/login" exact>
      <Login />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/app">
      <App />
    </Route>
  </Switch>;
};
