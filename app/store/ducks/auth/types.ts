export type IAuthState = {
  phoneCodes: Code[]
  accessToken: string | null
  refreshToken: string | null
  isAdmin: boolean | null
  error: string | null
}

export enum AuthActionsTypes {
  GET_CODES = "GET_CODES",
  LOGOUT = "LOGOUT",
  LOGIN = "LOGIN",
  CLEAR_ERROR = "CLEAR_ERROR",
  SET_AUTH_ERROR = "SET_AUTH_ERROR",
  CREATE_USER = "CREATE_USER",
}

export type Code = {
  id: number
  code: string
}

