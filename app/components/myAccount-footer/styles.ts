import { I18nManager, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const FOOTER_BLOCK: ViewStyle = {
  marginTop: 16,
  paddingBottom: 25,
}
export const SUPPORT_TEXT: TextStyle = {
  color: color.blue,
  fontSize: 15,
  marginLeft: 12,
}
export const SUPPORT_BTN: ViewStyle = {
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: color.blue,
  borderRadius: 12,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}
export const ABOUT_TEXT: TextStyle = {
  color: color.palette.fountainBlue,
  marginRight: 8,
}
export const ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 8,
  marginTop: 24,
}
export const ABOUT_BTN: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
export const ROTATE_180 = {
  transform: I18nManager.isRTL ? [{ rotate: "180deg" }] : [],
}
