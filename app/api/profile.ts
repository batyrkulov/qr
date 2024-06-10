/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from "axios"
import { Asset } from "react-native-image-picker"

import { PaginationRes } from "../hooks/usePagination"
import { CreateTicketFieldsType } from "../screens/Account/CreateTicketScreen"
import { axios } from "../utils/axios"

export type ChangePasswordReq = {
  old_password: string
  new_password: string
}

export interface ChangeContactInfoCodeRequest {
  phone_code_id: number
  phone: number
  email: string
}

export interface ChangeContactInfoRequest {
  phone_code_id: number
  phone: number
  email: string
  code: number
}

export const uploadAvatar = (avatar: Asset): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append("file", {
    // @ts-ignore
    uri: avatar.uri,
    type: avatar.type,
    name: avatar.fileName,
  })
  return axios.post("/public-file/upload-avatar", formData)
}

export type ProfileDataRequest = {
  email: string
  full_name: string
}

export const setProfileData = (data): Promise<AxiosResponse> => {
  return axios.post("/user/set-detail-information", data)
}

export const editProfileData = (data): Promise<AxiosResponse> => {
  return axios.post("/user/edit-profile", data)
}

export const changePassword = (data: ChangePasswordReq): Promise<AxiosResponse> => {
  return axios.post("/user/change-current-password", data)
}
export const changeContactInfo = (data: ChangeContactInfoRequest): Promise<AxiosResponse> => {
  return axios.post("/user/change-contact-info", data)
}

export const sendChangeContactInfoCode = async (
  data: ChangeContactInfoCodeRequest,
): Promise<AxiosResponse<{ email: string; message: string }>> => {
  return axios.post("/user/send-change-contact-info-code", data)
}

export type FAQInfo = {
  id: number
  title: string
  description: string
}

export interface IFAQ {
  frequently_asked_question_category_translation: { name: string }
  frequently_asked_question: { frequently_asked_question_translation: FAQInfo }[]
}

export const getFAQ = (): Promise<AxiosResponse<IFAQ[]>> => {
  return axios.get("/frequently-asked-question/get-all")
}

export const sendTicket = (data: CreateTicketFieldsType) => {
  return axios.post("/ticket/new", data)
}

export type Ticket = {
  id: number
  sender_email: string
  subject: string
  message: string
  is_resolved: boolean
  created_at: Date
}

export const getTickets = (): Promise<AxiosResponse<Ticket[]>> => {
  return axios.get("/ticket/get-all")
}

export type Agent = {
  id: number
  email: string
  full_name: string
  phone_number: string
  avatar: {
    id: number
    url: string
  }
}

export const getAgents = (): Promise<AxiosResponse<Agent[]>> => {
  return axios.get("/agent/get-all-for-users")
}

export interface IPayment {
  id: number
  title: string
  status: string
  created_at: Date
  payment_id?: number
  payment_method?: string
}

export type PaymentsRes = {
  payments: IPayment[]
} & PaginationRes

export const getPayments = (page: number): Promise<AxiosResponse<PaymentsRes>> => {
  return axios.get(`/payment/get-payments-history?page=${page}&limit=20`)
}

export const setFcmToken = (token: string) => {
  return axios.post("/user/set-fcm-token", { token })
}

export const removeMe = () => {
  return axios.post("/user/remove-current-user")
}
