import { AxiosResponse } from "axios"

import { axios } from "../utils/axios"

export interface ILocation {
  id: number | string
  slug: string
  name: string
}

export const fetchCountries = (): Promise<AxiosResponse> => {
  return axios.get("/country/all")
}
export const fetchDistricts = (countryId: string | number): Promise<AxiosResponse<ILocation[]>> => {
  return axios.get(`/district/get-districts-by-country-id?country_id=${countryId}`)
}
export const fetchAreas = (districtId: string | number): Promise<AxiosResponse<ILocation[]>> => {
  return axios.get(`/area/get-areas-by-district-id?district_id=${districtId}`)
}
