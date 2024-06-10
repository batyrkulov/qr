import { I18nManager, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const TEXTAREA: TextStyle = {
  borderColor: color.inputBorder,
  borderWidth: 1,
  borderRadius: 12,
  height: 150,
  textAlignVertical: 'top',
  textAlign: I18nManager.isRTL ? "right" : "left",
  padding: 20,
  paddingTop: 10,
  color: color.text
}
export const CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
}
export const INNER: ViewStyle = {
  marginVertical: 32,
}
