import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {DataSupplierScreen} from "../pages/DataSupplier";
import {DataUserScreen} from "../pages/DataUser";
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {DataBarangScreen} from "../pages/DataBarang";
import {EditProfile} from "../component/editProfile";

export const AppRoutes = () => {
  return <Switch>
    <Route path="/app" exact>
      <Redirect to={"/app/dashboard"}/>
    </Route>
    <Route path="/app/dashboard" exact>
      <Dashboard/>
    </Route>
    <Route path="/app/data-barang" exact>
      <DataBarangScreen/>
    </Route>
    <Route path="/app/data-user" exact>
      <DataUserScreen/>
    </Route>
    <Route path="/app/data-supplier" exact>
      <DataSupplierScreen/>
    </Route>
    <Route path="/app/edit-profile" exact>
      <EditProfile />
    </Route>
  </Switch>
};
