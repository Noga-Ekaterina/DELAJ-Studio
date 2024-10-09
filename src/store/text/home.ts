import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {IAbout, IFaq, IIdeas, ILandingText} from "@/typesData";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  landingsText: null |{kids: ILandingText, adult: Omit<ILandingText, 'footerText'>}= null;

  aboutText: null |IAbout = null

  faqText: null| IFaq[]=null

  ideasText: null| IIdeas =null

  fetchLandingsText=async ()=> {
    this.landingsText = await fetchData('Slides/Animations/text.json');
  }

  fetchAboutText=async ()=> {
    this.aboutText = await fetchData('Slides/About/text.json');
  }

  fetchIdeasText=async ()=> {
    this.ideasText = await fetchData('Slides/Ideas/text.json');
  }

  fetchFaqText=async ()=> {
    this.faqText = await fetchData('Slides/FAQ/data.json');
  }

  fetchAll=()=>{
    this.fetchLandingsText()
    this.fetchAboutText()
    this.fetchIdeasText()
    this.fetchFaqText()
  }
}

export default new Store()