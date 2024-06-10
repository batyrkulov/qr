import React, { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Dimensions, I18nManager, View } from "react-native"
import RNRestart from "react-native-restart"

import { ArabicIcon } from "../icons"
import { Picker } from "../picker"
import { RadioOption } from "../radio_button"
import { Text } from "../text/text"
import { EN_TEXT, ICON_STYLE, LANGUAGE_ICON } from "./styles"
import {
  CONTAINER_STYLE,
  INPUT_STYLE,
  SELECTOR_WRAPPER,
  TEXT_LABEL_STYLE,
} from "./styles-LanguageSelector"

const Component: React.FC = () => {
  const { i18n, t } = useTranslation()

  const EnIcon = useMemo(
    () => (
      <View style={LANGUAGE_ICON}>
        <Text text={"EN"} style={EN_TEXT} />
      </View>
    ),
    [],
  )

  const ArIcon = useMemo(
    () => (
      <View style={LANGUAGE_ICON}>
        <ArabicIcon width={20} height={14} />
      </View>
    ),
    [],
  )
  const changeLanguage = useCallback(
    ({ value }: RadioOption) => {
      if (i18n.language !== value) {
        I18nManager.forceRTL(!I18nManager.isRTL)
        RNRestart.Restart()
      }
    },
    [i18n.language],
  )

  return (
    <View style={SELECTOR_WRAPPER}>
      <Picker
        inputStyle={INPUT_STYLE}
        containerStyle={CONTAINER_STYLE}
        textStyle={TEXT_LABEL_STYLE}
        modalTitle={t("myAccount.language")}
        value={i18n.language.toUpperCase()}
        onChange={changeLanguage}
        iconStyle={ICON_STYLE}
        items={[
          { value: "en", label: "English", icon: EnIcon },
          { value: "ar", label: "Arabic", icon: ArIcon },
        ]}
        preselected={i18n.language}
        modalHeight={Dimensions.get("window").height * 0.35}
      />
    </View>
  )
}

export const LanguageSelector = React.memo(Component)
