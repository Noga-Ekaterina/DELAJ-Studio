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

export interface ILandingContact {
  title: ITranslation<string>
  link: ILink
}

export interface ILandingText {
  title: ITranslation<string>,
  text: ITranslation<string>,
  contacts: ILandingContact[]
  footerText: ITranslation<{text: string, highlighted: string}>
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

export interface IFaq {
  question: ITranslation<string>
  answer: ITranslation<string>
}

export interface IFormNote{
  text: string
  red?: string[]
  underline?: string[]
}

export interface IFormInput{
  name: string
  type: HTMLInputTypeAttribute
  placeholder: ITranslation<string>
  note?: ITranslation<IFormNote>
}

export interface IForm{
  inputs: IFormInput[]
  acceptTerms: ITranslation<string>
  button: ITranslation<string>
}