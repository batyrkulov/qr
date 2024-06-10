import { I18nManager, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const VIEW_ADS_BTN: TextStyle = {
  textAlign: I18nManager.isRTL ? "left" : "right",
  color: color.palette.fountainBlue,
  fontSize: 14,
}

export const VIEW_ADS_CONTAINER: ViewStyle = {
  paddingVertical: 10,
  borderBottomColor: color.palette.blackSqueeze,
  borderBottomWidth: 1,
}

export const FOOTER: ViewStyle = {
  height: null,
  paddingBottom: 40
}

export const DISABLED: ViewStyle = {
  opacity: 0.5,
}