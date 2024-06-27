import { StaticImageData } from "next/image"
import { ReactNode, FC, ComponentType } from "react"

export type HeaderTheme = 'default' | 'kids' | 'adult' | "mainScreen";

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
}

export interface ISection {
  id: string
  Component: ComponentType<{}>
  props?: {} 
  prevId?: string | null
  nextId?: string | null
}

export type Breakpoint = 'max' | 'lg' | 'md' | 'sm' 