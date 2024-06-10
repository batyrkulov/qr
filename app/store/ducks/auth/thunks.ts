import { createAsyncThunk } from "@reduxjs/toolkit"

import { AuthRequest, AuthWithCodeRequest, fetchPhoneCodes, login, signUp } from "../../../api/auth"
import { AuthActionsTypes, Code } from "./types"

export const getPhoneCodes = createAsyncThunk<Code[]>(AuthActionsTypes.GET_CODES, async () => {
  try {
    const { data } = await fetchPhoneCodes()
    return data
  } catch (error) {
    throw error.response.data.message
  }
})

// export const updateAccessToken = createAsyncThunk(
//   AuthActionsTypes.UPDATE_ACCESS_TOKEN,
//   async () => {
//     try {
//       const response = await refreshToken()
//       return response.data
//     } catch (error) {
//       throw error.response.data
//     }
//   },
// )

export const loginUser = createAsyncThunk(AuthActionsTypes.LOGIN, async (userData: AuthRequest) => {
  try {
    const { data } = await login(userData)
    return data
  } catch (error) {
    throw error.response.data.message
  }
})
export const createUser = createAsyncThunk(
  AuthActionsTypes.CREATE_USER,
  async (userData: AuthWithCodeRequest) => {
    try {
      const { data } = await signUp(userData)
      return data
    } catch (error) {
      throw error.response.data.message
    }
  },
)
