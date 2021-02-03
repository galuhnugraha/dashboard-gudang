import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../pages/Login/Login";
import {Register} from "../pages/Register";
import {App} from "../pages/App/App";
import PrivateRoute from "../component/PrivateRoute";
import { ForgotPassword } from "../pages/Login/ForgotPassword";

export const MainRoutes = () => {
  return <Switch>
    <Route path="/" exact>
      <Redirect to={"/login"}/>
    </Route>
    <Route path="/login" exact>
      <Login />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/forgot-password" exact>
      {/* <DetailSuplierScreen /> */}
      <ForgotPassword />
    </Route>
    {/* <Route path="/app">
      <App />
    </Route> */}
    <PrivateRoute component={App} path="/app" />
  </Switch>;
};
