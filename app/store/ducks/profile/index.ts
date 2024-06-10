import { createReducer } from "@reduxjs/toolkit"

import { clearUser, stopLoading } from "./actions"
import { getUser } from "./thunks"
import { IProfileState } from "./types"

const initialState: IProfileState = {
  loading: true,
  user: null,
}

export const profileReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(getUser.pending, (state) => {
      state.loading = true
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    .addCase(getUser.rejected, (state) => {
      state.loading = false
      state.user = null
    })
    .addCase(clearUser, (state) => {
      state.user = null
    })
    .addCase(stopLoading, (state) => {
      state.loading = false
    })
)
