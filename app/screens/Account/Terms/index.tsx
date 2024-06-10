import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useTranslation } from "react-i18next"
import RenderHtml from "react-native-render-html"
import { useSelector } from "react-redux"

import { Body, Header, Screen } from "../../../components"
import { selectAppData } from "../../../store/ducks/app/selectors"

export const TermsScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const data = useSelector(selectAppData)?.about_app_translation.terms
  if (!data) {
    return null
  }
  return (
    <Screen preset={"scroll"}>
      <Header title={t("terms.title")} leftIcon={"back"} onLeftPress={navigation.goBack} />
      <Body withBackGroundImage>
        <RenderHtml source={{ html: data }} />
      </Body>
    </Screen>
  )
}
