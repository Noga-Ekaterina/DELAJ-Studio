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

export interface ILandingText {
  title: ITranslation<string>,
  text: ITranslation<string>,
  footerText: ITranslation<{text: string, highlighted: string}>
}

export interface IProjectParameter {
  title: ITranslation<string>
  value: ITranslation<string>
}

export interface IProject {
  id: number,
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

export interface ICareerDuties {
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
    duties: ICareerDuties[]
  }
}