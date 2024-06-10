import { createReducer } from "@reduxjs/toolkit"

import { getAppData } from "./thunks"
import { AboutAppState } from "./types"

const initialState: AboutAppState = {
  data: null,
}

export const appInfoReducers = createReducer(initialState, (builder) =>
  builder.addCase(getAppData.fulfilled, (state, action) => {
    state.data = action.payload
  }),
)
