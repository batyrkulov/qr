import { StackActions, useNavigation } from "@react-navigation/native"
import React, { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { I18nManager, Image, Platform, View, ViewStyle } from "react-native"
import { Pagination } from "react-native-snap-carousel"

import { GradientButton, Text } from "../../components"
import { RootStack } from "../../navigators/constans"
import { color } from "../../theme"
import { BTN, CARD, DOTS_CONTAINER, IMAGE, TITLE_TEXT } from "./styles"

type OnBoardingCardProps = {
  carousel: any
  item: { text: string; picture_url: string }
  index: number
}

export const OnBoardingCard: FC<OnBoardingCardProps> = ({
  item: { text, picture_url },
  index,
  carousel,
}) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const goToApp = () => {
    navigation.dispatch(StackActions.replace(RootStack.mainStack))
  }

  const styles: ViewStyle = { backgroundColor: color[`onboardingStep${index + 1}`] as string }
  const activeIndexDot = useMemo(() => {
    if (Platform.OS === "android" && I18nManager.isRTL) {
      return 2 - index
    }
    return index
  }, [index])
  
  return (
    <>
      <View style={{ ...CARD, ...styles }}>
        <Image style={IMAGE} source={{ uri: picture_url }} />
        <Text preset="header" style={TITLE_TEXT}>
          {text}
        </Text>
        <Pagination
          containerStyle={DOTS_CONTAINER}
          carouselRef={carousel}
          activeDotIndex={index}
          dotColor={color.blue}
          inactiveDotColor={color.palette.blackSqueeze}
          dotsLength={3}
          inactiveDotScale={1}
          tappableDots
        />
      </View>
      {activeIndexDot === 2 && (
        <GradientButton style={BTN} onPress={goToApp} text={t("onBoarding.getStarted")} />
      )}
    </>
  )
}
