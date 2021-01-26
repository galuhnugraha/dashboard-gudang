import { action, observable } from 'mobx';
import { http } from "../utils/http";
import * as qs from "querystring";
import debounce from "lodash.debounce";

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
  @observable query = {
    pg: 1,
    lm: 10,
    warehouseId: '',
  }

  @action
  setPage(page = 1) {
    this.currentPage = page;
    this.getWarehouse();
  }

  @action
  setCurrentPage(current = 10) {
    this.pageSize = current;
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
    if (filter != null) {
      this.query.filter = filter;
    }
    console.log(this.query)
    this.isLoading = true;
    const token = localStorage.getItem("token")
    const data = await http.get(this.baseUrl + '?' + qs.stringify(this.query)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  AddWarehouse = async (data) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token");
    if (!filterValue) {
      this.getWarehouse();
    }
    const data = await http.get(`/dataWarehouse?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  async getDropdown() {
    // if (filter != null) {
    //   this.query.filter = filter;
    // }
    this.isLoading = true;
    const token = localStorage.getItem("token")
    const data = await http.get(this.warehouse).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }
}