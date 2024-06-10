import { createAction } from "@reduxjs/toolkit"

import { IMedia } from "../newPost/types"
import { INewTrading, NewTradingActionsTypes } from "./types"

export const setTradingOption = createAction<{
  option: keyof INewTrading
  value: string | number | IMedia[] | boolean
}>(NewTradingActionsTypes.SET_TRADING_OPTION)
export const clearTradingData = createAction(NewTradingActionsTypes.CLEAR_TRADING_DATA)
