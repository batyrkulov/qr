export interface IMetaState {
  optionsTranslations: IOptionWithTranslation[]
  iShowPayments: boolean
  loading: boolean
  wantedPrice: number
}

export interface IOptionWithTranslation {
  id: number | string
  value: string
  image_url: string
  item_description: {
    id: number | string
    name: string
  }
}

export enum MetaActionsTypes {
  GET_OPTIONS_TRANSLATIONS = "GET_OPTIONS_TRANSLATIONS",
  GET_IS_SHOW_PAYMENT = "GET_IS_SHOW_PAYMENT",
  GET_WANTED_INFO = "GET_WANTED_INFO"
}
