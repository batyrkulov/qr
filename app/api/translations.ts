import { AxiosResponse } from "axios";

import { axios } from "../utils/axios";

export const fetchItemsWithTranslations = (): Promise<AxiosResponse> => {
  return axios.get('/item/get-items-with-translation')
}