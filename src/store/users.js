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
}