import { action, observable } from 'mobx';
import { http } from "../utils/http";
import debounce from "lodash.debounce";
import * as qs from "querystring";
import Cookies from 'universal-cookie';

var cookie = new Cookies();

export class ProdukStore {
  baseUrl = "/products";

  @observable isLoading = false;
  @observable data = [];
  @observable warehouse = [];
  @observable maxLength = 0;
  @observable query = {
    pg: 1,
    lm: 10,
    warehouseID: '',
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
  setPage(page = 1) {
    this.currentPage = page;
    this.getAll();
  }

  @action
  async getAll(filter) {
    if (filter != null) {
      this.query.filter = filter;
    }
    var cookie = new Cookies();
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.baseUrl + '?' + qs.stringify(this.query)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  AddProduct = async (data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/products/addProduct`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  updateProduct = async (_id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.put(`/products/updateProduct/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  deleteProduct = async (_id) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.del(`/products/deleteProduct/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
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
      this.getAll();
    }
    const data = await http.get(`/products?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  AddProductOut = async (id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/dataWarehouse/createProductOut/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
      .then((res) => {
        this.isLoading = false;
        return res;
      })
      .catch((err) => {
        this.isLoading = false;
        throw err;
      });
  }
}