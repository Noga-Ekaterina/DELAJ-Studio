import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {TranslationTypes} from "@/types";

interface landingTextType {
  title: TranslationTypes<string>,
  text: TranslationTypes<string>,
  footerText: TranslationTypes<{text: string, highlighted: string}>
}

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  landingsText: null |{kids: landingTextType, adult: Omit<landingTextType, 'footerText'>}= null;

  fetchlandingsText=async ()=> {
    this.landingsText = await fetchData('Slides/Animations/text.json');
  }

  fetchAll=()=>{
    this.fetchlandingsText()
  }
}

export default new Store()