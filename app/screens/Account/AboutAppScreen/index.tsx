import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Image } from "react-native"
import { useSelector } from "react-redux"

import { Body, Header, Screen, Text } from "../../../components"
import { selectAppData } from "../../../store/ducks/app/selectors"
import { LOGO } from "./styles"

const Component = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const data = useSelector(selectAppData)

  return (
    <Screen preset={"scroll"}>
      <Header title={t("aboutApp.aboutApp")} leftIcon={"back"} onLeftPress={goBack} />
      <Body withBackGroundImage>
        <Image source={{ uri: data.logo.url }} style={LOGO} />
        <Text text={data.about_app_translation.text} />
      </Body>
    </Screen>
  )
}
export const AboutApp = React.memo(Component)
