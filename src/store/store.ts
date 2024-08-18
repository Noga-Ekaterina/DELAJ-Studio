import {CurrentPageType, HeaderVariant} from './../types';
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

  // Предыдущий вариант шапки normal, kids или adult
  prevHeaderVariant: HeaderVariant="normal"

  // Какой лэндос будет показан первым
  // если false - первым будет детский лэндос, после него по скроллу будет взрослый
  isLandingSwiped = false;

  //Открыто ли модальное меню
  isModalMenuOpened = false

  //Открыто ли модальное окно контактов
  isModalContactsOpened = false
  swipeLanding = (value: boolean) => {
    this.isLandingSwiped = value;
    console.log(this.isLandingSwiped)
  } 

  changeMenuOpened = (value: boolean) => {
    this.isMenuLandingsOpened = value;
  }

  changeCurrentPage = (value: CurrentPageType | null) => {
    this.currentPage = value;
  }

  changePrevHeaderVariant= (value: HeaderVariant)=>{
    this.prevHeaderVariant= value
  }

  toggleCurrentPage = () => {
    if (this.currentPage) {
      if (this.currentPage === 'kids') {
        this.changeMenuOpened
      }
    }
  }

  changeModalMenuOpened =(value: boolean)=>{
    this.isModalMenuOpened= value
  }

  changeModalContactsOpened =(value: boolean)=>{
    this.isModalContactsOpened= value
  }
}

export default new Store();