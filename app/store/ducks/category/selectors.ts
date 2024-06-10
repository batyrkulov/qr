import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "../../rootReducer"

export const selectSelectedCategories = (state: RootState) => state.category.selectedCategories
export const selectChosenCategory = createSelector(selectSelectedCategories, (categories) => {
  return Object.values(categories)
    .filter((c) => c)
    .map((c) => c.name)
    .join("-")
})
export const selectMainCategory = (state: RootState) =>
  Object.values(state.category.selectedCategories)[0]

export const selectSubCategory = (state: RootState) =>
  Object.values(state.category.selectedCategories)[1]

export const selectLastCategory = (state: RootState) => {
  const categories = Object.entries(state.category.selectedCategories).filter(
    (entry) => entry[0] !== "model",
  )
  return categories[categories.length - 1]?.[1]
}
