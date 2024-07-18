import { CurrentPageType } from './../types';
import {makeAutoObservable, values} from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  // открытие половинок детского и взрослого экрана меню
  // если false - при открытие главного экрана будет лого и выбор языка
  isMenuLandingsOpened = false;

  // Выбор конкретной половинки для открытия kids или adult
  currentPage: CurrentPageType = null;

  // Какой лэндос будет показан первым
  // если false - первым будет детский лэндос, после него по скроллу будет взрослый
  isLandingSwiped = false;

  //Открывалось ли главное меню

  isDidModal = false

  swipeLanding = (value: boolean) => {
    this.isLandingSwiped = value;
    console.log(this.isLandingSwiped)
  } 

  changeMenuOpened = (value: boolean) => {
    this.isMenuLandingsOpened = value;
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

  changeDidModal =(value: boolean)=>{
    this.isDidModal= value
  }
}

export default new Store();