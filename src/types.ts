import { StaticImageData } from "next/image"
import { ReactNode } from "react"

export type HeaderTheme = 'light' | 'dark';

export interface IWithClass {
  className?: string
} 

export interface IWithChildren {
  children?: ReactNode
}

export interface ProjectItem {
  id: number
  preview: StaticImageData
}