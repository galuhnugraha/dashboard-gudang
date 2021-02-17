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
import { ReceiveScreen } from "../pages/Payment/Recive/AddReceive";
import { DetailSuplierScreen } from "../pages/DataSupplier/DetailSuplier";
// import { ProductOut } from "../pages/Payment/ProductOut";
// import {InputProductOut} from "../pages/Payment/ProductOut/addProductOut";
import {ApprovalScreen} from "../pages/Payment/Approval";
import {DataUserScreen} from "../pages/Users";
import { DataInputUserScreen } from "../pages/Users/AddPrivillage";
// import {DataPrivillageScreen} from "../pages/Users/Privillage";
// import {AddPrivillageScreen} from "../pages/Users/Privillage/AddPrivillage";
import { DetailPrivillageScreen } from "../pages/Users/DetailPrivillage";
import {AddDetailPrivillage} from "../pages/Users/DetailPrivillage/addDetailPrivillage";
import { DetailProductInScreen } from "../pages/Payment/PurchaseOrder/DetailProductIn";

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
    <Route path="/app/product-in" exact>
      <PurchaseOrderScreen />
    </Route>
    <Route path="/app/recive" exact>
      <DataReciveScreen />
    </Route>
    <Route path="/app/input-product-in" exact>
      <AddPurchaseOrder />
    </Route>
    <Route path="/app/input-receive" exact>
      <ReceiveScreen />
    </Route>
    <Route path="/app/detail-suplier/:id" exact>
      <DetailSuplierScreen />
    </Route>
    {/* <Route path="/app/product-out" exact>
      <ProductOut />
    </Route> */}
    {/* <Route path="/app/input-product-out" exact>
      <InputProductOut />
    </Route> */}
    <Route path="/app/approval" exact>
      {/* <InputProductOut /> */}
      <ApprovalScreen />
    </Route>
    <Route path="/app/user-privillage" exact>
      <DataUserScreen />
    </Route>
    <Route path="/app/input-user-privillage" exact>
      <DataInputUserScreen />
    </Route>
    {/* <Route path="/app/privillage" exact>
      <DataPrivillageScreen />
    </Route> */}
    {/* <Route path="/app/input-privillage" exact>
      <AddPrivillageScreen />
    </Route> */}
    <Route path="/app/privillage-detail" exact>
      <DetailPrivillageScreen />
    </Route>
    <Route path="/app/input-detail-add" exact>
      <AddDetailPrivillage />
    </Route>
    <Route path="/app/detail-product-in/:id" exact>
      <DetailProductInScreen />
    </Route>
  </Switch>
};
