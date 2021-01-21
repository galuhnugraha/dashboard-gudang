import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {DataSupplierScreen} from "../pages/DataSupplier";
import {DataProdukScreen} from "../pages/DataProduk";
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {DataBarangScreen} from "../pages/DataBarang";
import {EditProfile} from "../component/editProfile";
import { AddProduk } from "../pages/DataProduk/AddProduk";

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
    <Route path="/app/data-produk" exact>
      <DataProdukScreen/>
    </Route>
    <Route path="/app/data-supplier" exact>
      <DataSupplierScreen/>
    </Route>
    <Route path="/app/edit-profile" exact>
      <EditProfile />
    </Route>
    <Route path="/app/input-product" exact>
      <AddProduk />
    </Route>
  </Switch>
};
