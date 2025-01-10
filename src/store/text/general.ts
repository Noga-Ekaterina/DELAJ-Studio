// store.js
import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {IFooters, IMenuSectionTitle} from "@/typesData";

class Store {
  menuSectionTitle: null | IMenuSectionTitle = null;
  footers: null|IFooters= null

  constructor() {
    makeAutoObservable(this);
  }

  fetchMenuSectionTitle=async ()=> {
    this.menuSectionTitle = await fetchData('Slides/title.json');
  }

  fetchFooters =async ()=> {
    this.footers = await fetchData('Footers.json');
  }

  fetchGeneral= async ()=>{
    await this.fetchMenuSectionTitle()
    await this.fetchFooters()
  }
}

export default new Store();