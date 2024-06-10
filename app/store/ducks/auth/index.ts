import { createReducer } from "@reduxjs/toolkit"

import { clearAuthError, logout, setAuthError } from "./actions"
import { createUser, getPhoneCodes, loginUser } from "./thunks"
import { IAuthState } from "./types"

const initialState: IAuthState = {
  phoneCodes: [],
  accessToken: null,
  refreshToken: null,
  error: null,
  isAdmin: null,
}

export const authReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(getPhoneCodes.fulfilled, (state, action) => {
      state.phoneCodes = action.payload
    })
    .addCase(getPhoneCodes.rejected, (state, action) => {
      state.error = action.error.message
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token
      state.isAdmin = action.payload.is_user_admin
      // state.refreshToken = action.payload.refreshToken
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message
      state.accessToken = null
      state.refreshToken = null
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token
      // state.refreshToken = action.payload.refreshToken
    })
    .addCase(createUser.rejected, (state, action) => {
      state.error = action.error.message
      state.accessToken = null
      state.refreshToken = null
    })
    .addCase(logout, (state) => {
      state.accessToken = null
      state.refreshToken = null
    })
    .addCase(clearAuthError, (state) => {
      state.error = null
    })
    .addCase(setAuthError, (state, action) => {
      state.error = action.payload
    })
)
