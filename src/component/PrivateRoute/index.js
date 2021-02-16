import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie'
// import { isLogin } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
  const cookie = new Cookies();
  return (

    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      cookie.get("Token") ?
        <Component {...props} />
        : <Redirect to="/login" />
    )} />

  );
};

export default PrivateRoute;