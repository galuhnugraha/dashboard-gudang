import { action, observable } from 'mobx';
import { http } from "../utils/http";
import debounce from "lodash.debounce";

export class ProdukStore {
  @observable isLoading = false;
  @observable data = [];
  @observable warehouse = [];
  @observable currentPage = 1;
  @observable pageSize = 10;
  @observable maxLength = 0;
  @observable selectedFilterValue = '';

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
  async getAll() {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    const data = await http.get(`/products?pg=${this.currentPage}&lm=${this.pageSize}`).set({ 'authorization': `Bearer ${token}` });
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
}