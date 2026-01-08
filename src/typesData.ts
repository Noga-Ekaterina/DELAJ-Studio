import {HTMLInputTypeAttribute} from "react";

export interface ITranslation<T> {
  ru: T,
  en: T
}

export interface IMenuSectionTitle {
  about: ITranslation<string>,
  career: ITranslation<string>,
  contacts: ITranslation<string>,
  faq: ITranslation<string>,
  ideas: ITranslation<string>
}

export interface ILink {
  href: ITranslation<string>
  text: ITranslation<string>
}
export interface IBlockHighlighted{
  text: string
  highlighted: string |string[]
}

export interface ILandingText {
  title: ITranslation<string>,
  text: ITranslation<string>
}

export interface ILadingsText {
  kids: ILandingText
  adult: ILandingText
}

export interface IFooterContact {
  title: ITranslation<string>
  link: ILink
}

export interface IFooterKids{
  contacts: IFooterContact[]
  socialTitle: ITranslation<IBlockHighlighted>
  social: ISocial[]
}

export interface IFooterAdult{
  contacts: IFooterContact[]
  social: ISocial[]
  rights: ITranslation<string>
}

export interface IFooterProject{
  social: ISocial[]
  rights: ITranslation<string>
}

export interface IFooters{
  kids: IFooterKids
  adult: IFooterAdult
  project: IFooterProject
}

export interface IProjectParameter {
  title: ITranslation<string>
  value: ITranslation<string>
}

export interface IProject {
  id: number,
  idea: boolean
  data: {
    title:  ITranslation<string>,
    type: ITranslation<string>
    parameters: IProjectParameter[]
    description: ITranslation<string>
  }
}

export interface IProjectsList {
  adults: IProject[]
  kids: IProject[]
}

export interface IBlockList {
  title: ITranslation<string>
  list: ITranslation<string[]>
}

export interface ICareer {
  id: number
  data:{
    title: ITranslation<string>
    description: ITranslation<string>
    options: ITranslation<string[]>
    isOpened: boolean
    duties: IBlockList[]
  }
}

export interface IBlockText {
  title: ITranslation<string>
  text: ITranslation<string>
}

export interface IAboutHowWork extends IBlockText{
  stages:IBlockList[]
}

export interface IAboutClients{
  title: ITranslation<string>
  quantity: number
}

export interface IAbout {
  text1: ITranslation<string>
  whatDo:IBlockText
  animationStyles: ITranslation<string[]>
  a_2D_3D: IBlockList
  specializations:ITranslation<string[]>
  howWork: IAboutHowWork
  clients: IAboutClients
}

export interface ISectionMail extends IBlockText{
  mail: ILink
}

export interface IIdeas extends ISectionMail{
  conditions: IBlockList
  projectsTitle: ITranslation<string>
}

export interface ISocial{
  title: ITranslation<string>
  href: ITranslation<string>
}

export interface IContacts extends ISectionMail{
  social: ISocial[]
}

export interface IFaq {
  question: ITranslation<string>
  answer: ITranslation<string>
}


export interface IFormInput{
  name: string
  type: HTMLInputTypeAttribute
  placeholder: ITranslation<string>
  note?: ITranslation<IBlockHighlighted>
  error?: ITranslation<string>
}

export interface IForm{
  inputs: IFormInput[]
  acceptTerms: ITranslation<string>
  button: ITranslation<string>
}

export interface ICareerPage{
  careerList?: null|ICareer[]
  formText?: null|IForm
}



export interface IProjectsAndLayout{
  projectsList?: null | IProjectsList
  menuSectionTitle?: null | IMenuSectionTitle
  footers?: null|IFooters
}

export interface IData extends IProjectsAndLayout{
  landingsText?: null |ILadingsText
  aboutText?: null |IAbout
  faqText?: null|IFaq[]
  ideasText?: null|IIdeas
  contactsText?: null|IContacts
  careerList?: null | ICareer[]
}