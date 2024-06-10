import { AxiosResponse } from "axios"

import { PhoneFields } from "../components"
import { Code } from "../store/ducks/auth/types"
import { IUser } from "../store/ducks/profile/types"
import { axios } from "../utils/axios"

export const fetchPhoneCodes = (): Promise<AxiosResponse<Code[]>> => {
  return axios.get("/phone-code")
}

export type AuthWithCodeRequest = {
  phone_code_id: number
  phone: number
  password: string
  code: string
}

export type AuthRequest = {
  phone_code_id: number
  phone: number
  password: string
}

export type CheckRestorePasswordCodeRequest = {
  code?: string
} & PhoneFields

export const getSignUpCode = (data: AuthRequest): Promise<AxiosResponse> => {
  return axios.post("/auth/sign-up", data)
}

export const signUp = (data: AuthWithCodeRequest) => {
  return axios.post("/auth/confirm-phone", data)
}

export const login = (data: AuthRequest): Promise<AxiosResponse> => {
  return axios.post("/auth/sign-in", data)
}

export const fetchMe = (): Promise<AxiosResponse<IUser>> => {
  return axios.get("/user/me")
}

export const logout = (): Promise<AxiosResponse> => {
  return axios.post('/auth/log-out')
}

export const getRestorePasswordCode = (data: PhoneFields): Promise<AxiosResponse> => {
  return axios.post('/auth/send-restore-password-code', data)
}
export const checkRestorePasswordCode = (data: CheckRestorePasswordCodeRequest): Promise<AxiosResponse> => {
  return axios.post('/auth/check-restore-password-code', data)
}
export const restorePassword = (data: AuthWithCodeRequest): Promise<AxiosResponse> => {
  return axios.post('/auth/restore-password', data)
}