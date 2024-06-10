import { useNavigation } from "@react-navigation/core"
import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { AccountStack } from "../../navigators/constans"
import { NotificationIcon } from "../icons"
import { Text } from "../text/text"
import { LanguageSelector } from "./languageSelector"
import { RIGHT_WRAPPER_ACCOUNT_HEADER, WRAPPER_ACCOUNT_HEADER } from "./styles"

const Component: React.FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const goToNotification = () => {
    navigation.navigate(AccountStack.notifications)
  }
  return (
    <View style={WRAPPER_ACCOUNT_HEADER}>
      <Text text={t("myAccount.account")} preset={"header"} />
      <View style={RIGHT_WRAPPER_ACCOUNT_HEADER}>
        <LanguageSelector />
        {/* <NotificationIcon isDot onPress={goToNotification} /> */}
      </View>
    </View>
  )
}
export const MyAccountHeader = React.memo(Component)
