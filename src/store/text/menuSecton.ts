// store.js
import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {IMenuSectionTitle} from "@/typesData";

class Store {
  menuSectionTitle: null | IMenuSectionTitle = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchMenuSectionTitle=async ()=> {
    this.menuSectionTitle = await fetchData('Slides/title.json');
  }
}

export default new Store();