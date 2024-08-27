import { StaticImageData } from "next/image"
import { ReactNode, FC, ComponentType } from "react"

export type LangType = 'ru' | 'en';

export type PageTransitionType = "normal" | "back"

export type CurrentPageType = null | 'kids' | 'adult'

export type HeaderVariant= "normal" | "kids"| "adult"

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