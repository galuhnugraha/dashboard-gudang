import { action, observable } from 'mobx';
import { AuthStore } from './auth';
import { ProdukStore } from './produk';
import { UserStore } from './users';
import { WarehouseStore } from './Warehouse/index';
import {WarehouseDataStore} from './Warehouse/warehouse';
import { SupplierStore } from './supplier';
import { BarangStore } from './barang';

export class Store {
  @observable token = "";
  auth = new AuthStore(this);
  user = new UserStore(this);
  products = new ProdukStore(this);
  warehouse = new WarehouseStore(this);
  warehouseData = new WarehouseDataStore(this);
  supliers = new SupplierStore(this);
  barang = new BarangStore(this);

  


  @action
  setToken(token) {
    this.http.setToken(token);
    this.token = token;
  }
}
