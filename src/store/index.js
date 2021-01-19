import {action, observable} from 'mobx';

export class Store {
  @observable testObs = 'umu';

  @action
  setTestObs() {
    this.testObs = 'qwfp';
    console.log(this.testObs, 'this.testObs');
  };
}
