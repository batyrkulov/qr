import AsyncStorage from "@react-native-community/async-storage"
import { StackActions, useNavigation } from "@react-navigation/native"
import React, { FC, useEffect } from "react"
import { I18nManager, View } from "react-native"
import RNRestart from "react-native-restart"

import { MARGIN_BOTTOM } from "../../common_styles"
import { Body, Button, Header, Icon, Screen, Text } from "../../components"
import { RootStack } from "../../navigators/constans"
import { useInternetConnection } from "../../utils/useInternetConnection"
import { BODY, BUTTON, BUTTON_AR, BUTTON_EN, BUTTON_TEXT, MAIN } from "./styles"

export enum APP_LANGUAGES {
  en = "en",
  ar = "ar",
}

export const ChooseLanguageScreen: FC = () => {
  const navigation = useNavigation()
  useInternetConnection()
  const changeLanguage = (isRTL: boolean) => {
    AsyncStorage.setItem("LANGUAGE", isRTL ? APP_LANGUAGES.ar : APP_LANGUAGES.en)
    if (isRTL === I18nManager.isRTL) {
      navigation.dispatch(StackActions.replace(RootStack.onBoarding))
      return
    }
    I18nManager.forceRTL(isRTL)
    RNRestart.Restart()
  }

  useEffect(() => {
    AsyncStorage.setItem("IS_FIRST", "false")
  }, [])

  return (
    <Screen>
      <Header title="Choose language" />
      <Body containerStyles={BODY} withBackGroundImage>
        <Icon icon="logo" />
        <View style={MAIN}>
          <Text style={MARGIN_BOTTOM(32)} preset="bold">
            Choose you app language
          </Text>
          <Button
            onPress={() => changeLanguage(false)}
            textStyle={BUTTON_TEXT}
            style={[BUTTON, BUTTON_EN, MARGIN_BOTTOM(16)]}
            text="English"
          />
          <Button
            onPress={() => changeLanguage(true)}
            textStyle={BUTTON_TEXT}
            style={[BUTTON, BUTTON_AR]}
            text="Arabic"
          />
        </View>
      </Body>
    </Screen>
  )
}
