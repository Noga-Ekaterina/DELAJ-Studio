import {CurrentPageType, HeaderVariant, PageTransitionType} from './../types';
import {makeAutoObservable, values} from 'mobx';
import {changeOverflow} from "@/utils/changeOverflow";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  // показывать ли главный экран
  showMainScreen=true

  // показывать ли главную страницу
  showMainPage=false

  // позиция скролла главной страници
  scrollPositionMainPage=0

  // тип перехода между страницами normal или back.
  // Если back - возврашаемся в то место, откуда перешли сюда (scrollPositionMainPage)
  pageTransition: PageTransitionType= "normal"

  // открытие половинок детского и взрослого экрана меню.
  // Если false - при открытие главного экрана будет лого и выбор языка
  isMenuLandingsOpened = false;

  // Выбор конкретной половинки для открытия kids или adult
  currentPage: CurrentPageType = null;

  // Предыдущий вариант шапки normal, kids или adult
  prevHeaderVariant: HeaderVariant="normal"

  // Предыдущий hash
  prevHash=""

  // Какой лэндос будет показан первым
  // если false - первым будет детский лэндос, после него по скроллу будет взрослый
  isLandingSwiped = false;

  // можно ли скроллить
  isScrollOn=true

  //Открыто ли модальное меню
  isModalMenuOpened = false

  //Открыто ли модальное окно контактов
  isModalContactsOpened = false

  changeShowMainScreen= (value: boolean)=>{
    this.showMainScreen = value
  }

  changeShowMainPage= (value: boolean)=>{
    this.showMainPage = value
  }

  changeScrollPositionMainPage= (value: number)=>{
    this.scrollPositionMainPage= value
  }

  changePageTransition =(value: PageTransitionType)=>{
    this.pageTransition= value
  }

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

  changePrevHash= (value: string)=>{
    this.prevHash= value
  }

  toggleCurrentPage = () => {
    if (this.currentPage) {
      if (this.currentPage === 'kids') {
        this.changeMenuOpened
      }
    }
  }

  togleScroll=(value: boolean)=>{
    this.isScrollOn= value
  }

  changeModalMenuOpened =(value: boolean)=>{
    this.isModalMenuOpened= value
    changeOverflow(value)
  }

  changeModalContactsOpened =(value: boolean)=>{
    this.isModalContactsOpened= value
    changeOverflow(value)
  }
}

export default new Store();