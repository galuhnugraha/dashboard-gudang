import { action, observable } from 'mobx';
import { http } from "../utils/http";
import * as qs from "querystring";
import Cookies from 'universal-cookie';


export class BarangStore {
  warehouse = "/warehouse";
  datawarehouse = "/dataWarehouse"

  @observable isLoading = false;
  @observable data = [];
  @observable query = {
    warehouseId: '',
  }

  @action
  async getDropdown(filter) {
    const cookie = new Cookies();
    if (filter != null) {
      this.query.filter = filter;
    }
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.warehouse + '?' + qs.stringify(this.query)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }


}