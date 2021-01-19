import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import {StoreProvider} from "./utils/useStores";
import {MainRoutes} from "./routes";
import 'antd/dist/antd.css';

export const Main = () => {
  return <StoreProvider>
    <Router>
      <MainRoutes/>
    </Router>
  </StoreProvider>
};
