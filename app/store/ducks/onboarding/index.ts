import { createReducer } from "@reduxjs/toolkit"

import { stopLoading } from "./actions"
import { getOnBoarding } from "./thunks"
import { IOnboardingState } from "./types"

const initialState: IOnboardingState = {
  cards: [],
  error: null,
  loading: true,
}

export const onBoardingReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(getOnBoarding.fulfilled, (state, action) => {
      state.cards = action.payload
      state.loading = false
    })
    .addCase(getOnBoarding.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    })
    .addCase(stopLoading, (state) => {
      state.loading = false
    })
)
