export interface INewPostState {
  loading: boolean
  post: INewPost
}
export enum NewPostActionsTypes {
  SET_POST_OPTION = "SET_POST_OPTION",
  CLEAR_POST_DATA = "CLEAR_POST_DATA",
}

export enum PostTypesId {
  Sell = 1,
  Buy = 2,
  Trading = 3,
}

export interface INewPost {
  id: number,
  is_share_location: boolean
  post_type_id: PostTypesId
  category_id: number | string
  model_id: string | number
  details: { [key: string]: any }
  title: string
  description: string
  price: number
  client_phone_number?: string
  area_id: string | number
  media_files: IMedia[]
  payment_plan_id: string | number
  isEdit?: boolean
}

export interface IMedia {
  uri: string
  type: string
  name: string
  file_key: string
  is_primary?: boolean
  order: number
}
