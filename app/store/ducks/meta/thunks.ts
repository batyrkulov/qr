import { createAsyncThunk } from "@reduxjs/toolkit"

import { getShowPaymentStatus, getWantedPlan } from "../../../api/meta"
import { fetchItemsWithTranslations } from "../../../api/translations"
import { IOptionWithTranslation, MetaActionsTypes } from "./types"

export const getOptionsTranslations = createAsyncThunk<IOptionWithTranslation[]>(
  MetaActionsTypes.GET_OPTIONS_TRANSLATIONS,
  async () => {
    try {
      const { data } = await fetchItemsWithTranslations()
      return data
    } catch (error) {
      throw error.response.data.message
    }
  },
)
export const getIsShowPayment = createAsyncThunk(MetaActionsTypes.GET_IS_SHOW_PAYMENT, async () => {
  try {
    const { data } = await getShowPaymentStatus()
    return data
  } catch (error) {
    throw error.response.data.message
  }
})
export const getWantedInfo = createAsyncThunk(MetaActionsTypes.GET_WANTED_INFO, async () => {
  try {
    const { data } = await getWantedPlan()
    return data
  } catch (error) {
    throw error.response.data.message
  }
})
