import { AxiosResponse } from "axios"

import { axios } from "../utils/axios"

export const getAllCategories = (): Promise<AxiosResponse> => {
  return axios.get(`/category/get-child-categories`, {
    params: {
      parent_category_id: 1,
    },
  })
}

export const getWantedCategories = (): Promise<AxiosResponse> => {
  return axios("/category/get-wanted-categories")
}

export const getCategoryById = ({
  id,
  isIncludeWanted = true,
}: {
  id: string | number
  isIncludeWanted: boolean
}): Promise<AxiosResponse> => {
  const is_include_wanted = isIncludeWanted ? "true" : "false"
  return axios.get(`/category/get-child-categories`, {
    params: {
      parent_category_id: id,
      is_include_wanted,
    },
  })
}

export const getModelsByCategory = (id: string | number): Promise<AxiosResponse> => {
  return axios.get(`/model/get-models-by-category?category_id=${id}`)
}

export const getMainPage = (): Promise<AxiosResponse> => {
  return axios.get("/category/get-categories-for-main-page")
}
