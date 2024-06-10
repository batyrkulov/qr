// import { store } from 'app/store'
// import { updateAccessToken } from 'app/store/ducks/auth/thunks'
// import { stopLoading } from 'app/store/ducks/profile/actions'
import AsyncStorage from "@react-native-community/async-storage"
import BaseAxios from "axios"
import { I18nManager } from "react-native"

import { APP_LANGUAGES } from "../../screens/ChooseLanguage"
import { store } from "../../store"
import { stopLoading } from "../../store/ducks/profile/actions"
import {BASE_URL} from '@env'

export const photoUrl = 'https://dl75o2qcc54w6.cloudfront.net' //production 
//export const photoUrl = 'https://d2z1tzaxpjxw9a.cloudfront.net' // dev

export const axios = BaseAxios.create({
  baseURL: BASE_URL,
  headers: { Accept: "*/*" },
  params: {
    language: I18nManager.isRTL ? APP_LANGUAGES.ar : APP_LANGUAGES.en,
  },
})

/* Use it as config for routes which do not need any credentials */

export const noCredentials = {
  params: {
    noAuth: true,
  },
}

/* Inject token to the request each time */

axios.interceptors.request.use(
 async (request) => {
    const token = store.getState().auth.accessToken
    console.log(token, 'api token')
    const fcm = await AsyncStorage.getItem("fcm")
    request.headers.fcmtoken = fcm
    if (token) {
      request.headers.Authorization = `${token}`
    } else {
      request.headers.Authorization = ``
    }
    return request
  },
  (error) => {
    return error
  },
)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  // eslint-disable-next-line consistent-return
  async (error) => {
    if (!error.response?.status) {
      store.dispatch(stopLoading())
    }

    // const originalRequest = error.config
    // if (error.response?.status === 401 && store.getState().auth.refreshToken) {
    //   await store.dispatch(updateAccessToken())
    //   axios.defaults.headers.common.Authorization = `Bearer ${
    //     store.getState().auth.accessToken
    //   }`
    //   return axios(originalRequest)
    // }

    throw error
  },
)
