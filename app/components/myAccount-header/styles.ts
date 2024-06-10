import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const WRAPPER_ACCOUNT_HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
export const RIGHT_WRAPPER_ACCOUNT_HEADER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent:'space-between',
}
export const LANGUAGE_ICON: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: color.blue,
  alignItems: "center",
  justifyContent: "center",
  marginRight: 10,
}
export const EN_TEXT: TextStyle = {
  fontSize: 14,
  color: color.palette.white,
  fontWeight: "bold",
}
export const ICON_STYLE: ImageStyle = {
  bottom: 9,
}
