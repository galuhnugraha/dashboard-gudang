import { action, observable } from 'mobx';
import { http } from "../../utils/http";
import * as qs from "querystring";
import debounce from "lodash.debounce";
import Cookies from 'universal-cookie';

var cookie = new Cookies();

export class WarehouseStore {
  baseUrl = "/dataWarehouse";
  warehouse = "/warehouse";

  @observable isLoading = false;
  @observable data = [];
  @observable items = [];
  @observable currentPage = 1;
  @observable pageSize = 10;
  @observable maxLength = 0;
  @observable selectedFilterValue = '';
  @observable detailWarehouseQuery = {
    pg: 1,
    lm: 10,
    warehouseId: '',
  }
  @observable query = {
    pg: 1,
    lm: 10,
    warehouseId: '',
  }

  @action
  setPage(page = 1) {
    this.query.pg = page;
    this.getWarehouse();
  }

  @action
  setCurrentPage(current = 10) {
    this.query.lm = current;
    this.getWarehouse();
  }

  setPageDebounced = debounce((page) => {
    this.setSearch(page);
  }, 300);

  @action
  setSearch(page = 1) {
    this.currentPage = page;
    this.search();
  }

  @action
  async getWarehouse(filter) {
    // if (filter != null) {
    //   this.query.filter = filter;
    // }
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.baseUrl + '?' + qs.stringify(this.detailWarehouseQuery) ).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  AddWarehouse = async (data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/warehouse/createWarehouse`).set({ 'authorization': `Bearer ${token}` }).send(data)
      .then((res) => {
        this.isLoading = false;
        return res;
      })
      .catch((err) => {
        this.isLoading = false;
        throw err;
      });
  }

  @action
  updateWarehouse = async (productId, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/warehouse/ProductOut/${productId}`).set({ 'authorization': `Bearer ${token}` }).send(data)
      .then((res) => {
        this.isLoading = false;
        return res;
      })
      .catch((err) => {
        this.isLoading = false;
        throw err;
      });
  }

  @action
  deleteWarehouse = async (_id) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.del(`/dataWarehouse/deleteDataProduct/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
      this.delete = res.body.data;
      this.isLoading = false;
      return res;
    })
      .catch(err => {
        throw err;
      })
  }

  @action
  async search() {
    let filterValue = this.selectedFilterValue;
    const token = cookie.get("Token");
    if (!filterValue) {
      this.getWarehouse();
    }
    const data = await http.get(`/dataWarehouse?pg=${this.detailWarehouseQuery.pg}&lm=${this.detailWarehouseQuery.lm}&search=${filterValue}&warehouseId=${this.detailWarehouseQuery.warehouseId}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  async getDataWarehouse() {
    // if (filter != null) {
    //   this.query.filter = filter;
    // }
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.warehouse).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }
}