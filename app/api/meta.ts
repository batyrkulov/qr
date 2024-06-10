import { AxiosResponse } from "axios"

import { axios } from "../utils/axios"
import { Plan } from './post'

export const getShowPaymentStatus = (): Promise<AxiosResponse<{ is_show_payment: boolean }>> => {
  return axios.get("/application-meta-information/get-show-payment-status")
}
export const addFcmToken = (token: string) => {
  return axios.post("/fcm-token/add", { token })
}
export const getWantedPlan = (): Promise<AxiosResponse<Plan>> => {
  return axios("/payment-plan/get-wanted-plan-price")
}
