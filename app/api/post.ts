/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from "axios";
import { Asset } from "react-native-image-picker";

import { INewPost, PostTypesId } from "../store/ducks/newPost/types";
import { toEnglishDigits } from "../utils/arabicDigits";
import { axios } from "../utils/axios";

export enum CategorySectionTypes {
  ADD = 1,
  GET = 2,
}

export enum ExtraInformationBlockTypeEnum {
  INPUT = "INPUT",
  YEAR = "YEAR",
  INPUT_NUMBER = "INPUT_NUMBER",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  CHECKBOX_WITH_PICTURES = "CHECKBOX_WITH_PICTURE",
  RADIO = "RADIO",
  RANGE = "RANGE",
}

export type InformationItem = {
  id: number | string
  image_url: string | null
  value: string
  item_description: {
    id: number | string
    name: string
  }
}

export type Block = {
  id: number | string
  block: {
    block_type: { id: number | string; name: ExtraInformationBlockTypeEnum }
    id: number | string
    slug: string
    is_required: boolean
    range_min: number
    range_max: number
    block_description: {
      id: number | string
      name: string
      placeholder: string
    }
    item: InformationItem[]
  }
}

export type Section = {
  id: number | string
  section_description: {
    id: number | string
    name: string
  }
  section_block: Block[]
}

export type ExtraInfoResponseItem = {
  id: number | string
  category_section_type: { id: number | string; name: CategorySectionTypes }
  section: Section
}

export interface IPost {
  id: number | string
  is_share_location: boolean
  title: string
  description: string
  price: number
  is_premium_status: boolean
  created_at: Date
  post_file: PostFile[]
  view_count: number
  post_payment_plan: {
    id: number
    is_active: boolean
    payment_plan: {
      id: number
      icon_url: string | null
    }
  }
}

export type PostsResponse = {
  meta: {
    current_page: number
    pages_count: number
  }
  posts: IPost[]
}

export type PostFirstImage = {
  key: string
}

export type PostsRequest = {
  page: number
  category_id: number | string
  filters?: { [key: string]: any }
}

export interface IDealer {
  id: number | string
  phone: string
  email: string
  full_name: string
  is_active: boolean
  is_profile_filled: boolean
  is_verified: boolean
  created_at: Date
  phone_code: {
    id: number
    code: string
  }
  avatar?: {
    url: string
  }
  is_removed: boolean
}

export interface IArea {
  id: number | string
  slug: string
  area_description: {
    id: number
    name: string
  }
  coordinates: {
    x: number
    y: number
  }
}

export type PostFile = {
  is_primary: boolean
  public_file: {
    url: string
    mime_type: string
    key: string
  }
}

export interface IDetailedPost {
  id: number | string
  is_share_location: boolean
  title: string
  description: string
  price: number
  client_phone_number?: string
  is_premium_status: boolean
  created_at: Date
  year: number
  color_exterior: string
  color_interior: string
  mileage: string
  import_country: string
  body_type: string
  transmission: string
  cylinders: string
  condition: string
  additional_features: string[]
  fuel_type: string
  seats_material: string
  sunroof: string
  hours: number
  more_features: (number | string)[]
  post_file: PostFile[]
  user: IDealer
  area: IArea
  media_page: number
  view_page: number
  is_favorite: boolean
  view_count: number
}

export type Plan = {
  icon_url: string
  id: number | string
  slug: string
  price: number
  star_color: string
  payment_plan_translation: {
    id: number | string
    name: string
  }
  payment_plan_plan_item: PlanItem[]
  payment_plan_plan_label: PlanLabel[]
}

export type PlanLabel = {
  id: number | string
  plan_label: {
    background_color: string
    id: number
    plan_label_translation: {
      id: number | string
      name: string
    }
  }
}

export type PlanItem = {
  id: number | string
  plan_item: {
    id: number | string
    plan_item_translation: {
      id: number | string
      name: string
    }
  }
}

export const getExtraInfo = (
  categorySectionType: CategorySectionTypes,
  categoryId,
): Promise<AxiosResponse<ExtraInfoResponseItem[]>> => {
  return axios.get(
    `/category-section/get-sections-for-category?category_id=${categoryId}&category_section_type_id=${categorySectionType}`,
  )
}

export const uploadPostMedia = (file: Asset): Promise<AxiosResponse> => {
  const formData = new FormData();
  
  formData.append("file", {
    // @ts-ignore
    uri: file.uri,
    type: file.type.includes("video") ? "video/mp4" : file.type,
    name: file.fileName,
  });
  
  return axios.post("/public-file/upload-post-media", formData);
}

export const uploadChatMedia = (file: Asset): Promise<AxiosResponse> => {
  const formData = new FormData();

  formData.append("file", {
    // @ts-ignore
    uri: file.uri,
    type: file.type.includes("video") ? "video/mp4" : file.type,
    name: file.fileName,
  });

  return axios.post("/private-file/upload-private-file", formData);
}

export const createPost = (
  // id
  postData: INewPost,
): Promise<AxiosResponse<INewPost & { id: number | string }>> => {
  const data = {
    ...postData,
    price: postData.price ? toEnglishDigits(postData.price) : null,
    details: {
      ...postData.details,
      mileage: postData.details.mileage
        ? Math.round(toEnglishDigits(postData.details.mileage))
        : null,
    },
    media_files: postData.media_files.map((file) => ({
      key: file.file_key,
      is_primary: file.is_primary || false,
      order: file.order,
    })),
  }

  return axios.post("/post/create-post", data)
}

export const getPostsByCategory = ({
  // id

  page,
  category_id,
  filters,
}: PostsRequest): Promise<AxiosResponse<PostsResponse>> => {
  return axios.get(
    `/post/get-posts-by-advanced-filters?page=${page}&limit=6&category_id=${category_id}`,
    { params: filters },
  )
}

export const getPremiumPosts = ({ page, filters }): Promise<AxiosResponse<PostsResponse>> => {
  return axios.get(`/post/get-premium-posts?page=${page}&limit=6`, { params: filters })
}

export const getPostsFirstImages = (): Promise<AxiosResponse<PostFirstImage[]>> => {
  return axios.get(`/preload/main-posts-images`)
}

export const getLatestPosts = ({
  page,
  filters,
}: Omit<PostsRequest, "category_id">): Promise<AxiosResponse<PostsResponse>> => {
  return axios.get(`/post/get-latest-posts?page=${page}&limit=6`, { params: filters })
}

export const getPostDetails = (id): Promise<AxiosResponse<IDetailedPost>> => {
  return axios.get(`/post/get-post-details?post_id=${id}`)
}

export const getPostsByUserId = ({ id, page }): Promise<AxiosResponse<PostsResponse>> => {
  return axios.get(`/post/get-posts-by-user?page=${page}&limit=6&user_id=${id}`)
}

export const toggleIsPostFavourite = (
  isFavourite: boolean,
  id: number | string,
): Promise<AxiosResponse> => {
  if (!isFavourite) {
    return axios.post(`/post-favorite/add-post-to-favorite?post_id=${id}`)
  } else {
    return axios.delete(`/post-favorite/remove-post-from-favorites/?post_id=${id}`)
  }
}

export const getFavouritePosts = (page): Promise<AxiosResponse<PostsResponse>> => {
  return axios.get(`/post/get-favorite-posts?page=${page}&limit=6`)
}

export const getPlans = (post_type: number | string): Promise<AxiosResponse<Plan[]>> => {
  return axios.get(`/payment-plan/get-payment-plans-for-post?post_type_id=${post_type}`)
}

export const getMyPosts = (
  isArchived: boolean,
  PostTypeId: PostTypesId,
  page,
): Promise<AxiosResponse<PostsResponse>> => {
  return axios.get(
    `/post/get-posts-for-current-user-by-filters?page=${page}&limit=6&post_type_id=${PostTypeId}&is_archived=${isArchived}`,
  )
}

export type Report = {
  post_id: number | string
  text: string
}

export const sendReport = (data: Report): Promise<AxiosResponse> => {
  return axios.post("/post-report/new-report", data)
}

export const getAllPosts = ({ page, id, filters }): Promise<AxiosResponse<PostsResponse>> => {
  return axios(
    `/post/get-posts-in-all-child-categories?page=${page}&limit=${6}&parent_category_id=${id}`,
    { params: filters },
  )
}

export const getRecommendedPosts = (): Promise<AxiosResponse<{ posts: IDetailedPost[] }>> => {
  return axios("/post/get-recommended-posts")
}

export const createTrading = (tradingData): Promise<AxiosResponse> => {
  const data = {
    ...tradingData,
    mileage: Math.round(toEnglishDigits(tradingData.mileage)),
    media_files: tradingData.media_files.map((file) => ({
      key: file.file_key,
      is_primary: file.is_primary || false,
    })),
  }
  return axios.post("/trading/create-new", data)
}

export const deletePostMedia = ({ key }) => {
  return axios.delete("/public-file/delete-post-media", { data: { key }})
}

export const updatePost = ({postId, payload}) => {
  return axios.patch(`/post/update-post?post_id=${postId}`, payload)
}

export const updatePostPayment = ({
  postId, 
  paymentPlanId
}: {postId: number, paymentPlanId: number}) => {
  return axios.patch('/post/update-payment', {
    post_id: postId,
    payment_plan_id: paymentPlanId,
  })
}

export const rotatePostPhoto = (payload) => {
  return axios.patch('/public-file/rotate-post-media', payload)
}

export const updatePostPhoto = ({key, file}) => {
  const formData = new FormData()
  
  formData.append('file', {
    // @ts-ignore
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });
  
  formData.append("key", key);
  
  return axios.patch('/public-file/update-post-media', formData);
}