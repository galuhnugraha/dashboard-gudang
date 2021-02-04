import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register";
import { App } from "../pages/App/App";
import PrivateRoute from "../component/PrivateRoute";
import { ForgotPassword } from "../pages/Login/ForgotPassword";
import { EmailConfirmation } from '../pages/Login/emailConfirmation';
import { ConfirmationScreen } from '../pages/Register/confirmation';

export const MainRoutes = () => {
  return <Switch>
    <Route path="/" exact>
      <Redirect to={"/login"} />
    </Route>
    <Route path="/login" exact>
      <Login />
    </Route>
    <Route path="/register" exact>
      <Register />
    </Route>
    <Route path="/forgot-password/:id" exact>
      {/* <DetailSuplierScreen /> */}
      <ForgotPassword />
    </Route>
    <Route path="/email-confirmation" exact>
      <EmailConfirmation />
    </Route>
    <Route path="/confirmation" exact>
      <ConfirmationScreen />
    </Route>
    <PrivateRoute component={App} path="/app" />
  </Switch>;
};
