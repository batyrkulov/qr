import { createAsyncThunk } from "@reduxjs/toolkit"

import { fetchMe } from "../../../api/auth"
import { IUser,ProfileActionsTypes } from "./types"

export const getUser = createAsyncThunk<IUser>(ProfileActionsTypes.GET_USER, async () => {
  try {
    const { data } = await fetchMe()
    return data
  } catch (error) {
    throw error.response.data.message
  }
})
