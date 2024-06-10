import { AxiosResponse } from "axios"

import { axios } from "../utils/axios"

export const fetchOnboarding = (): Promise<AxiosResponse> => {
  return axios.get("/onboarding")
}
