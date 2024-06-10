import { IMedia } from "../newPost/types"

export interface INewTradingState {
  post: INewTrading
}
export enum NewTradingActionsTypes {
  SET_TRADING_OPTION = "SET_TRADING_OPTION",
  CLEAR_TRADING_DATA = "CLEAR_TRADING_DATA",
}

export interface INewTrading {
  type: number
  title: string
  description: string
  brand_model: string
  contact_options: number[]
  media_files: IMedia[]
}
