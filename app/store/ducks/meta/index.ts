import { createReducer } from "@reduxjs/toolkit"

import { getIsShowPayment, getOptionsTranslations, getWantedInfo } from "./thunks"
import { IMetaState } from "./types"

const initialState: IMetaState = {
  optionsTranslations: [],
  iShowPayments: true,
  loading: true,
  wantedPrice: 0,
}

export const metaReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getOptionsTranslations.fulfilled, (state, action) => {
      state.optionsTranslations = action.payload
    })
    .addCase(getOptionsTranslations.rejected, (state) => {
      state.optionsTranslations = []
    })
    .addCase(getIsShowPayment.fulfilled, (state, action) => {
      state.iShowPayments = action.payload.is_show_payment
      state.loading = false
    })
    .addCase(getIsShowPayment.rejected, (state) => {
      state.loading = false
    })
    .addCase(getWantedInfo.fulfilled, (state, action) => {
      state.wantedPrice = action.payload.price
    }),
)
