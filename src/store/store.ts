import {makeAutoObservable} from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isMenuOpened = false;

  changeMenuOpened = (value: boolean) => {
    this.isMenuOpened = value;
    console.log(this.isMenuOpened);
  }
}

export default new Store();