import { makeAutoObservable } from "mobx";
import {IAbout, IContacts, IData, IFaq, IForm, IIdeas, ILadings, ILandingText} from "@/typesData";


class Store {
  constructor() {
    makeAutoObservable(this);
  }

  landingsText: null |ILadings= null;

  aboutText: null |IAbout = null

  faqText: null| IFaq[]=null

  ideasText: null| IIdeas =null

  contactsText: null|IContacts= null

  setLandingsText=(data?: null|ILadings)=> {
    if (data)
      this.landingsText = data
  }

  setAboutText=(data?: null|IAbout)=> {
    if (data)
      this.aboutText = data
  }

  setIdeasText=(data?: null|IIdeas)=> {
    if (data)
      this.ideasText = data
  }

  setContactsText=(data?: null|IContacts)=> {
    if (data)
      this.contactsText = data
  }

  setFaqText=(data?: null|IFaq[])=> {
    if (data)
      this.faqText = data
  }

  setAll= (data: IData)=>{
    this.setLandingsText(data.landingsText)
    this.setAboutText(data.aboutText)
    this.setIdeasText(data.ideasText)
    this.setContactsText(data.contactsText)
    this.setFaqText(data.faqText)
  }
}

export default new Store()