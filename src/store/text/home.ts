import { makeAutoObservable } from "mobx";
import {fetchData} from "@/utils/fetchData";
import {IAbout, IContacts, IFaq, IIdeas, ILadings, ILandingText} from "@/typesData";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  landingsText: null |ILadings= null;

  aboutText: null |IAbout = null

  faqText: null| IFaq[]=null

  ideasText: null| IIdeas =null

  contactsText: null|IContacts= null

  fetchLandingsText=async ()=> {
    this.landingsText = await fetchData('Slides/Animations/text.json');
  }

  fetchAboutText=async ()=> {
    this.aboutText = await fetchData('Slides/About/text.json');
  }

  fetchIdeasText=async ()=> {
    this.ideasText = await fetchData('Slides/Ideas/text.json');
  }

  fetchContactsText=async ()=> {
    this.contactsText = await fetchData('Slides/Contacts/text.json');
  }

  fetchFaqText=async ()=> {
    this.faqText = await fetchData('Slides/FAQ/data.json');
  }

  fetchAll=()=>{
    this.fetchLandingsText()
    this.fetchAboutText()
    this.fetchIdeasText()
    this.fetchContactsText()
    this.fetchFaqText()
  }
}

export default new Store()