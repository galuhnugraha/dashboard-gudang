import { action, observable } from 'mobx';
import { http } from "../utils/http";
import debounce from "lodash.debounce";
import * as qs from "querystring";
import Cookies from 'universal-cookie';

var cookie  = new Cookies();


export class SupplierStore {
  baseUrl = '/supliers'
  suplier = '/dataSuplier'
  supliers = '/dataSuplier'
  @observable isLoading = false;
  @observable data = [];
  @observable detailData = [];
  @observable currentPage = 1;
  @observable pageSize = 10;
  @observable maxLength = 0;
  @observable selectedFilterValue = '';
  @observable selectedFilterValueDetail = '';
  @observable detailSuplierQuery = {
    pg: 1,
    lm: 10,
    suplierId: '',
  }
  @observable detailSuplierQueryItem = {
    pg: 1,
    lm: 10,
    suplierId: '',
  }

  @action
  setPage(page = 1) {
    this.currentPage = page;
    this.getSupplier();
  }

  @action
  setCurrentPage(current = 10) {
    this.pageSize = current;
    this.getSupplier();
  }

  setPageDebounced = debounce((page) => {
    this.setSearch(page);
  }, 300);

  setPageDebouncedDetail = debounce((page) => {
    this.setSearchDetail(page);
  }, 300);

  @action
  setSearch(page = 1) {
    this.currentPage = page;
    this.search();
  }

  @action
  setSearchDetail(page = 1) {
    this.currentPage = page;
    this.searchDetail();
  }


  @action
  async getSupplier() {
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.baseUrl).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  AddSupplier = async (data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/supliers/addSupliers`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  updateSupplier = async (id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.put(`/supliers/updateSuplier/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  deleteSupplier = async (_id) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.del(`/supliers/deleteSuplier/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
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
      this.getSupplier();
    }
    const data = await http.get(`/supliers?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  AddSuplierOut = async (id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/supliers/addSuplierProduct/${id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  async getSupplierProduct() {
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.suplier + '?' + qs.stringify(this.detailSuplierQuery)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  async getSupplierProductReview() {
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get(this.supliers + '?' + qs.stringify(this.detailSuplierQueryItem)).set({ 'authorization': `Bearer ${token}` });
    this.detailData = data.body.data;
    this.maxLength = data.body.totalData;
    this.isLoading = false;
  }

  @action
  async searchDetail() {
    let filterValue = this.selectedFilterValueDetail;
    const token = cookie.get("Token");
    if (!filterValue) {
      this.getSupplier();
    }
    const data = await http.get(`/dataSuplier?search=${filterValue}`).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }
}