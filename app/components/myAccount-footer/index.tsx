import { useNavigation } from "@react-navigation/native"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"

import { AccountStack } from "../../navigators/constans"
import { color } from "../../theme"
import { ArrowRightIcon, HeadphonesIcon } from "../icons"
import { Text } from "../text/text"
import {
  ABOUT_BTN,
  ABOUT_TEXT,
  FOOTER_BLOCK,
  ROTATE_180,
  ROW,
  SUPPORT_BTN,
  SUPPORT_TEXT,
} from "./styles"

type MyAccountFooterType = {
  onPressSupport: () => void
}

const Component = ({ onPressSupport }: MyAccountFooterType): React.ReactElement => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const openAboutApp = useCallback(() => {
    navigate(AccountStack.aboutAppScreen)
  }, [navigate])

  const goToTerms = () => {
    navigate(AccountStack.terms)
  }

  return (
    <View style={FOOTER_BLOCK}>
      <TouchableOpacity style={SUPPORT_BTN} onPress={onPressSupport}>
        <HeadphonesIcon width={18} height={17} />
        <Text text={t("myAccount.support")} style={SUPPORT_TEXT} />
      </TouchableOpacity>
      <View style={ROW}>
        <TouchableOpacity style={ABOUT_BTN} onPress={openAboutApp}>
          <Text text={t("myAccount.about")} style={ABOUT_TEXT} />
          <ArrowRightIcon
            strokeColor={color.palette.fountainBlue}
            width={7}
            height={12}
            style={ROTATE_180}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToTerms} style={ABOUT_BTN}>
          <Text text={t("myAccount.termConditions")} style={ABOUT_TEXT} />
          <ArrowRightIcon
            strokeColor={color.palette.fountainBlue}
            width={7}
            height={12}
            style={ROTATE_180}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const MyAccountFooter = React.memo(Component)
