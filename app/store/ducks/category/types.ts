import { FC } from "react"
import { SvgProps } from "react-native-svg"

export interface ICategoryState {
  selectedCategories: { [categoryName: string]: { name: string; id: string | number } }
}

export enum CategoryActionsTypes {
  ADD_SELECTED_CATEGORY = "ADD_SELECTED_CATEGORY",
  CLEAR_CHOSEN_CATEGORIES = "CLEAR_CHOSEN_CATEGORIES",
}

export interface ICategory {
  id: number | string
  short_name: string
  full_name: string
  icon?: string
  is_last: boolean
  localIcon?: FC<SvgProps>
}
