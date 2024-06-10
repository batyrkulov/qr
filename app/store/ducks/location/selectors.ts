import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "../../rootReducer"

export const selectSelectedDistrict = (state: RootState) => state.location.selectedDistrict
export const selectSelectedArea = (state: RootState) => state.location.selectedArea
export const selectChosenLocation = createSelector(
  selectSelectedDistrict,
  selectSelectedArea,
  (district, area) => {
    if (district && area) {
      return `${district} - ${area}`
    }
    return null
  },
)
