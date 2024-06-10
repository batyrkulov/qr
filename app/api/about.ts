import { AxiosResponse } from "axios"

import { AppData } from "../store/ducks/app/types"
import { axios } from "../utils/axios"

export const getAbout = (): Promise<AxiosResponse<AppData>> => {
  return axios.get("/about-app/get-information")
}
