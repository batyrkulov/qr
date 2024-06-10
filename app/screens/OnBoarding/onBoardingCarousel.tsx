import { StackActions, useNavigation } from "@react-navigation/native"
import React, { FC, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Dimensions, I18nManager, Platform, View, ViewStyle } from "react-native"
import Carousel from "react-native-snap-carousel"
import { useSelector } from "react-redux"

import { Button, OnBoardingCard } from "../../components"
import { HEADER, HEADER_CONTENT } from "../../components/onboardingCard/styles"
import { RootStack } from "../../navigators/constans"
import { RootState } from "../../store/rootReducer"

export const BTN: ViewStyle = {
  marginTop: 16,
}

export const OnBoardingCarousel: FC = () => {
  const carousel = useRef()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0)
  const onboarding = useSelector((state: RootState) => state.onboarding.cards)
  const carouselData = getCarouselData(onboarding, carousel)

  return (
    <>
      <View style={HEADER}>
        {activeIndex !== 2 ? (
          <Button
            text={t("onBoarding.skip")}
            onPress={() => {
              navigation.dispatch(StackActions.replace(RootStack.mainStack))
            }}
            preset="link"
          />
        ) : (
          <View style={HEADER_CONTENT} />
        )}
      </View>
      <Carousel
        ref={carousel}
        onSnapToItem={setActiveIndex}
        data={carouselData}
        sliderWidth={Dimensions.get("screen").width}
        inactiveSlideScale={0.5}
        renderItem={({ item, index }) => (
          <OnBoardingCard carousel={carousel} item={item} index={index} />
        )}
        itemWidth={320}
      />
    </>
  )
}

const getCarouselData = (data, carousel) => {
  if (Platform.OS === "android" && I18nManager.isRTL) {
    return data.map((d) => ({ ...d, carousel })).reverse()
  }
  return data.map((d) => ({ ...d, carousel }))
}
