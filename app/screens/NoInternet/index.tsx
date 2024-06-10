import React from "react"
import { Image } from "react-native"
import RNRestart from "react-native-restart"

import { Body, GradientButton, Text } from "../../components"
import { NO_AD_TEXT } from "../PostsList/styles"
import { BODY, BTN, IMAGE } from "./styles"

export const NoInternetScreen = () => {
  const goToApp = () => {
    RNRestart.Restart()
  }
  return (
    <Body containerStyles={BODY} withBackGroundImage>
      <Image style={IMAGE} source={require("./noWifi.png")} />
      <Text style={NO_AD_TEXT}>
        Your internet connection is currently not available please check or try again.
      </Text>
      <GradientButton onPress={goToApp} style={BTN} text="Try Again" />
    </Body>
  )
}
