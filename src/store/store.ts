import { HeaderTheme } from '@/types';
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
}

export default new Store();