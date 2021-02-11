import { action, observable, computed } from 'mobx';
import { http } from "../utils/http";


export class UserStore {
  @observable isLoading = false;
  @observable data = [];
  @observable currentPage = 1;
  @observable pageSize = 10;
  @observable maxLength = 0;

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
  resetPassword = async (id,data) => {
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
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token")
    const data = await http.get('/menus').set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }

  @action
  updateDepartement = async (_id,data) => {
    this.isLoading = true;
    const token = localStorage.getItem("token")
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
    const token = localStorage.getItem("token")
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
  async getPrivillage() {
    this.isLoading = true;
    const token = localStorage.getItem("token")
    const data = await http.get('/previlages').set({ 'authorization': `Bearer ${token}` });
    this.data = data.body.data;
    this.isLoading = false;
  }
}