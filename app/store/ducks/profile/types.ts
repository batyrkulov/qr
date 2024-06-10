export type IProfileState = {
  loading: boolean
  user: IUser | null
}

export enum ProfileActionsTypes {
  GET_USER = "GET_USER",
  CLEAR_USER = "CLEAR_USER",
  STOP_LOADING = "STOP_LOADING",
}

export type Code = {
  id: number
  code: string
}

export interface Avatar {
  url: string
  key: string
}

export interface IUser {
  id: number
  phone: number
  phone_code_id: number
  phone_code: {code: string, id: number | string},
  email: string | null
  full_name: string | null
  is_profile_filled: boolean
  avatar: Avatar | null
  country: { id: string; name: string } | null
  district: { id: string; name: string } | null
  area: { id: string; name: string } | null
  can_add_phone_number: boolean
}
