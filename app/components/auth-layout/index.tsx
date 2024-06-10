import { useNavigation } from "@react-navigation/native"
import React, { FC } from "react"
import { View } from "react-native"

import { Screen } from ".."
import { Body } from "../body"
import { Header } from "../header"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"
import { INFO, LOGO } from "./styles"

type AuthLayoutProps = {
  logoLabel?: string
  title?: string
  handleBack?: () => void
  fixedScreen?: boolean
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  logoLabel,
  title = "",
  handleBack,
  fixedScreen,
}) => {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  return (
    <>
      <Screen preset={fixedScreen ? 'fixed' : 'scroll'}>
        <Header title={title} rightIcon="close" onRightPress={handleBack || goBack} />
        <Body withBackGroundImage>
          <View style={INFO}>
            <Icon style={LOGO} icon="logo" />
            {logoLabel && <Text preset="bold">{logoLabel}</Text>}
          </View>
          {children}
        </Body>
      </Screen>
    </>
  )
}
