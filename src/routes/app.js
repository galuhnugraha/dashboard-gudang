import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {DataSupplierScreen} from "../pages/DataSupplier";
import {DataProdukScreen} from "../pages/DataProduk";
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {DetailWarehouseScreen} from "../pages/Warehouse/detailWarehouse";
import {EditProfile} from "../component/editProfile";
import { AddProduk } from "../pages/DataProduk/AddProduk";
import { WarehouseScreen } from "../pages/Warehouse";
import {AddWarehouse} from "../pages/Warehouse/addWarehouse";
import {AddSupplierScreen} from "../pages/DataSupplier/AddSupplier";
import { DataTransactionScreen } from "../pages/Payment/DataTransaction";
import { PurchaseOrderScreen } from "../pages/Payment/PurchaseOrder";
import { DataReciveScreen } from "../pages/Payment/Recive";
import { AddPurchaseOrder } from "../pages/Payment/PurchaseOrder/AddPurchaseOrder";

export const AppRoutes = () => {
  return <Switch>
    <Route path="/app" exact>
      <Redirect to={"/app/dashboard"}/>
    </Route>
    <Route path="/app/dashboard" exact>
      <Dashboard/>
    </Route>
    <Route path="/app/detail-warehouse/:id" exact>
      <DetailWarehouseScreen/>
    </Route>
    <Route path="/app/data-produk" exact>
      <DataProdukScreen/>
    </Route>
    <Route path="/app/data-supplier" exact>
      <DataSupplierScreen/>
    </Route>
    <Route path="/app/input-supplier" exact>
      <AddSupplierScreen />
    </Route>
    <Route path="/app/edit-profile" exact>
      <EditProfile />
    </Route>
    <Route path="/app/input-product" exact>
      <AddProduk />
    </Route>
    <Route path="/app/data-warehouse" exact>
      <WarehouseScreen />
    </Route>
    <Route path="/app/input-warehouse" exact>
      <AddWarehouse />
    </Route>
    <Route path="/app/data-transaction" exact>
       <DataTransactionScreen />
    </Route>
    <Route path="/app/purchase-order" exact>
      <PurchaseOrderScreen />
    </Route>
    <Route path="/app/recive" exact>
      <DataReciveScreen />
    </Route>
    <Route path="/app/input-purchase-order" exact>
      <AddPurchaseOrder />
    </Route>
  </Switch>
};
