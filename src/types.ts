import { StaticImageData } from "next/image"
import { ReactNode, FC, ComponentType } from "react"

export type CurrentPageType = null | 'kids' | 'adult'

export interface IWithClass {
  className?: string
} 

export interface IWithChildren {
  children?: ReactNode
}

export interface ProjectItem {
  id: number
  preview: string
  href: string
}

export interface ISection {
  id: string
  Component: ComponentType<{}>
  props?: {} 
  prevId?: string | null
  nextId?: string | null
}

export interface ICareerDuties {
  title: string
  list: string[]
}

export interface ICareer {
  id: string
  title: string
  description: string
  duties: Array<ICareerDuties>
}

export interface IProject {
  id: string,
  data: {
    title:  string,
    type:  string,
    date: string,
    animation:  string,
    duration: {
      hours?: number
      minutes: number
    },
    description: string
  }
}

//Формы

export interface IFormValues {
  name: string
  phone: string
  email: string
  portfolio: string
  telegram: string
  about: string
}

export interface IFormData {
  id: string
  values: IFormValues
}