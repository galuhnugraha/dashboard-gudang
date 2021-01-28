import { action, observable } from 'mobx';
import { http } from "../../utils/http";
import * as qs from "querystring";
import debounce from "lodash.debounce";

export class WarehouseDataStore {
  baseUrl = "/dataWarehouse";
  warehouse = "/warehouse";
  @observable isLoading = false;
  @observable data = [];
  @observable query = {
    pg: 1,
    lm: 10,
  }
  // @observable selectedFilterValue = '';

  @action
  setPage(page = 1) {
    this.query.pg = page;
    this.getWarehouseData();
  }

  @action
  setCurrentPage(current = 10) {
    this.query.lm = current;
    this.getWarehouseData();
  }

  setPageDebounced = debounce((page) => {
    this.setSearch(page);
  }, 300);

  @action
  setSearch(page = 1) {
    this.currentPage = page;
    this.searchData();
  }

  @action
  async getWarehouseData() {
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

  @action
  updateWarehouseData = async (_id, data) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    return http.put(`/warehouse/updateWarehouse/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  deleteWarehouseData = async (_id) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    return http.del(`/warehouse/deleteWarehouse/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
      this.delete = res.body.data;
      this.isLoading = false;
      return res;
    })
      .catch(err => {
        throw err;
      })
  }

  @action
  async getFilterWarehouse(filter) {
    if (filter != null) {
      this.query.filter = filter;
    }
    this.isLoading = true;
    const token = localStorage.getItem("token")
    const data = await http.get(this.baseUrl + '?' + qs.stringify(this.query)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  async searchData() {
    let filterValue = this.selectedFilterValue;
    const token = localStorage.getItem("token");
    if (!filterValue) {
      this.getWarehouseData();
    }
    const data = await http.get(`/warehouse?pg=${this.query.pg}&lm=${this.query.lm}&search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }
}