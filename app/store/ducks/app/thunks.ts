import { createAsyncThunk } from "@reduxjs/toolkit"

import { getAbout } from "../../../api/about"
import { AppActionsTypes, AppData } from "./types"

export const getAppData = createAsyncThunk<AppData>(AppActionsTypes.GET_APP_DATA, async () => {
  try {
    const { data } = await getAbout()
    return data
  } catch (error) {
    throw error.response.data.message
  }
})
