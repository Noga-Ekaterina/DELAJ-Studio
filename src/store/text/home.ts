import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {ILandingText} from "@/typesData";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  landingsText: null |{kids: ILandingText, adult: Omit<ILandingText, 'footerText'>}= null;

  fetchlandingsText=async ()=> {
    this.landingsText = await fetchData('Slides/Animations/text.json');
  }

  fetchAll=()=>{
    this.fetchlandingsText()
  }
}

export default new Store()