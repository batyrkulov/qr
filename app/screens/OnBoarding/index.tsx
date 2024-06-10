import AsyncStorage from "@react-native-community/async-storage"
import { AxiosResponse } from "axios"
import React, { FC, useEffect } from "react"
import { Platform } from "react-native"
import FastImage from 'react-native-fast-image'
import { getPostsFirstImages, PostFirstImage } from "../../api/post"

import { Screen } from "../../components"
import { photoUrl } from "../../utils/axios"
import { useInternetConnection } from "../../utils/useInternetConnection"
import { OnBoardingCarousel } from "./onBoardingCarousel"
import { SCREEN } from "./styles"

export const OnBoardingScreen: FC = () => {
  useInternetConnection()
  useEffect(() => {
    AsyncStorage.setItem("Onboarding", "true")
    if (Platform.OS === 'ios') {
      getPostsFirstImages().then((res: AxiosResponse<PostFirstImage[]>) => {
        FastImage.preload(res.data.map((item: PostFirstImage) => (
          {
            uri: photoUrl + '/' + item.key + '_type1_compress'
          }
        )))
      })
    }
  }, [])
  return (
    <Screen style={SCREEN}>
      <OnBoardingCarousel />
    </Screen>
  )
}
