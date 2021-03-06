import { action, observable} from 'mobx';
import { http } from "../utils/http";
import * as qs from "querystring";
import Cookies from 'universal-cookie';

var cookie = new Cookies();

export class UserStore {
  baseUrl = "/users/DapartmentAndPosition";
  baseUrl2 = "/previlages";
  @observable isLoading = false;
  @observable data = [];
  @observable docs = [];
  @observable dataQuery = {};
  @observable currentPage = 1;
  @observable pageSize = 10;
  @observable maxLength = 0;
  @observable query = {
    pg: 1,
    lm: 10,
    dapartment: '',
    position: ''
  }
  @observable queryDetail = {
    pg: 1,
    lm: 10,
    userId: ''
  }


  constructor(context) {
    this.context = context;
  }

  @action
  sendEmail = async (data) => {
    this.isLoading = true;
    return http.post(`/users/sendmail`).send(data)
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
  resetPassword = async (id, data) => {
    this.isLoading = true;
    return http.put(`/users/forgotPassword/${id}`).send(data)
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
  addMenus = async (data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/menus/createMenus`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  async getAll() {
    this.isLoading = true;
    const token = cookie.get("Token")
    const data = await http.get('/menus').set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  updateDepartement = async (_id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.put(`/menus/updateMenu/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  deleteDepartemen = async (_id) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.del(`/menus/deletedMenu/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
      this.delete = res.body.data;
      this.isLoading = false;
      return res;
    })
      .catch(err => {
        throw err;
      })
  }

  @action
  async getUsersPrivillage(filter) {
    this.isLoading = true;
    if (filter != null) {
      this.query.filter = filter;
    }
    const token = cookie.get("Token")
    const data = await http.get(this.baseUrl + '?' + qs.stringify(this.query)).set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  addPrivillage = async (data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.post(`/createPrevilages`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  async getPrivillage(filter) {
    this.isLoading = true;
    if (filter != null) {
      this.queryDetail.filter = filter;
    }
    const token = cookie.get("Token")
    const data = await http.get(this.baseUrl2 + '?' + qs.stringify(this.queryDetail)).set({ 'authorization': `Bearer ${token}` });
    // console.log(data)
    return data.body.data.docs;
    // this.isLoading = false;
  }

  @action
  updatedPrivillage = async (_id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.put(`/users/updateMemberUser/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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
  deletedPrivillage = async (_id) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.del(`/users/deleteMemberUser/${_id}`).set({ 'authorization': `Bearer ${token}` }).then(res => {
      this.delete = res.body.data;
      this.isLoading = false;
      return res;
    })
      .catch(err => {
        throw err;
      })
  }


  @action
  updatedPrivillageDetail = async (_id, data) => {
    this.isLoading = true;
    const token = cookie.get("Token")
    return http.put(`/previlages/updatePrevilages/${_id}`).set({ 'authorization': `Bearer ${token}` }).send(data)
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