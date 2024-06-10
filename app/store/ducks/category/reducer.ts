import { createReducer } from "@reduxjs/toolkit"

import {
  addSelectedCategory, clearChosenCategories,
} from "./actions"
import { ICategoryState } from "./types"

const initialState: ICategoryState = {
  selectedCategories: {}
}

export const categoryReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(addSelectedCategory, (state, action) => {
      if (action.payload.categoryId === 0 || action.payload.categoryId === '0')
        state.selectedCategories = {};
        
      state.selectedCategories[action.payload.categoryId] = action.payload.value
    })
    .addCase(clearChosenCategories, (state) => {
      state.selectedCategories = {}
    })
)
