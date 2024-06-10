import { createAction } from "@reduxjs/toolkit"

import { CategoryActionsTypes } from "./types"

export const addSelectedCategory = createAction<{
  categoryId: string | number
  value: { name: string; id: number | string }
}>(CategoryActionsTypes.ADD_SELECTED_CATEGORY)
export const clearChosenCategories = createAction(CategoryActionsTypes.CLEAR_CHOSEN_CATEGORIES)