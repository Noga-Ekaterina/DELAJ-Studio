// store.js
import { makeAutoObservable } from "mobx";
import {IData, IFooters, IMenuSectionTitle} from "@/typesData";

class Store {
  menuSectionTitle: null | IMenuSectionTitle = null;
  footers: null|IFooters= null

  constructor() {
    makeAutoObservable(this);
  }

  setMenuSectionTitle=(data?: null|IMenuSectionTitle)=> {
    if (data)
      this.menuSectionTitle = data
  }

  setFooters =(data?: null|IFooters)=> {
    if (data)
      this.footers = data
  }

  setGeneral=(data: IData)=>{
    this.setMenuSectionTitle(data.menuSectionTitle)
    this.setFooters(data.footers)
  }
}

export default new Store();