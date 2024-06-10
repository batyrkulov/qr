import { AxiosResponse } from "axios"

import { PaginationRes } from "../hooks/usePagination"
import { axios } from "../utils/axios"
import { IDealer } from "./post"

type ChatUser = IDealer & { is_current_user: boolean }

export interface IMessage {
  created_at: Date
  id: number
  is_viewed: boolean
  text: string
  user: ChatUser
  message_file: {
    private_file: {
      url: string
    }
  }[]
}

export type GetMessagesRes = {
  messages: IMessage[]
} & PaginationRes

export type ChatData = {
  created_at: Date
  id: number
  message: IMessage
  participant: { id: number; user: ChatUser }[]
  updated_at: Date
}

export const getChats = (): Promise<AxiosResponse<ChatData[]>> => {
  return axios("/chat/get-list-for-current-user")
}

export const getMessages = (
  id: number | string,
  page: number,
): Promise<AxiosResponse<GetMessagesRes>> => {
  return axios(`/chat/get-messages-in-chat?another_participant_user_id=${id}&page=${page}&limit=10`)
}
