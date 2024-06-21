import { HeaderTheme } from './../types';
import {makeAutoObservable} from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isMenuOpened = false;
  headerTheme: HeaderTheme = 'light';

  changeMenuOpened = (value: boolean) => {
    this.isMenuOpened = value;
  }

  setHeaderTheme = (theme: HeaderTheme) => {
    this.headerTheme = theme;
  }
}

export default new Store();