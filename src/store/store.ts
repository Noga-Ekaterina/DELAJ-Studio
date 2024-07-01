import { CurrentPageType } from './../types';
import {makeAutoObservable} from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isMenuOpened = false;
  currentPage: CurrentPageType = null;

  isLandingSwiped = false;

  swipeLanding = (value: boolean) => {
    this.isLandingSwiped = value;
    console.log(this.isLandingSwiped)
  } 

  changeMenuOpened = (value: boolean) => {
    this.isMenuOpened = value;
  }

  changeCurrentPage = (value: CurrentPageType) => {
    this.currentPage = value;
  }

  toggleCurrentPage = () => {
    if (this.currentPage) {
      if (this.currentPage === 'kids') {
        this.changeMenuOpened
      }
    }
  }
}

export default new Store();