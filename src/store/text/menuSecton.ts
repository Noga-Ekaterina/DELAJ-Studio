// store.js
import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {TranslationTypes} from "@/types";

interface menuSectionTitleTypes {
  about: TranslationTypes<string>,
  career: TranslationTypes<string>,
  contacts: TranslationTypes<string>,
  faq: TranslationTypes<string>,
  ideas: TranslationTypes<string>
}

class Store {
  menuSectionTitle: null | menuSectionTitleTypes = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchMenuSectionTitle=async ()=> {
    this.menuSectionTitle = await fetchData('Slides/title.json');
  }
}

export default new Store();