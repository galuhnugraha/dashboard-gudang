import {action, observable} from 'mobx';
import {AuthStore} from './auth';
import {UserStore} from './users';

export class Store {
  @observable token = "";
  auth = new AuthStore(this);
  user = new UserStore(this);

  @action
  setToken(token) {
    this.http.setToken(token);
    this.token = token;
  }
}
