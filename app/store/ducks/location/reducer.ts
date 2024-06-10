import { createReducer } from "@reduxjs/toolkit"

import { clearLocations, setSelectedArea, setSelectedDistrict } from "./actions"
import { ILocationState } from "./types"

const initialState: ILocationState = {
  selectedArea: null,
  selectedDistrict: null,
}

export const locationReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(setSelectedDistrict, (state, action) => {
      state.selectedDistrict = action.payload
    })
    .addCase(setSelectedArea, (state, action) => {
      state.selectedArea = action.payload
    })
    .addCase(clearLocations, (state) => {
      state.selectedArea = null
      state.selectedDistrict = null
    }),
)
