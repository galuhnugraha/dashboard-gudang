import { action, observable } from 'mobx';
import { http } from "../utils/http";
import debounce from "lodash.debounce";
import * as qs from "querystring";

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

  @action
  setPage(page = 1) {
    this.currentPage = page;
    this.getAll();
  }

  @action
  setCurrentPage(current = 10) {
    this.pageSize = current;
    this.getAll();
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
  async getAll(filter) {
    if(filter != null){
      this.query.filter = filter; 
    }
    this.isLoading = true;
    console.log(qs.stringify(this.query));
    const token = localStorage.getItem("token")
    const data = await http.get(this.baseUrl + '?' + qs.stringify(this.query)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  AddProduct = async (data) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
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
  updateProduct = async (id, data) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    return http.put(`/products/updateProduct/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token");
    if (!filterValue) {
      this.getAll();
    }
    const data = await http.get(`/products?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  AddProductOut = async (data,id) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
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