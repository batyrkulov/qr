import { createReducer } from "@reduxjs/toolkit"

import { clearTradingData, setTradingOption } from "./actions"
import { INewTradingState } from "./types"

const initialState: INewTradingState = {
  post: {
    title: null,
    description: null,
    brand_model: null,
    contact_options: [],
    type: 1,
    media_files: []
  },
}

export const newTradingReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(setTradingOption, (state, action) => {
      state.post[action.payload.option] = action.payload.value as never
    })
    .addCase(clearTradingData, (state) => {
      state.post = initialState.post
    }),
)
