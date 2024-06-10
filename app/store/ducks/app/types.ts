export type AppData = {
  id: number
  phone_number: string
  logo: {
    id: number
    url: string
    original_name: string
    key: string
    mime_type: string
  }
  about_app_translation: {
    id: number
    text: string
    terms: string
  }
}

export type AboutAppState = {
  data: AppData | null
}

export enum AppActionsTypes {
  GET_APP_DATA = "GET_APP_DATA",
}
