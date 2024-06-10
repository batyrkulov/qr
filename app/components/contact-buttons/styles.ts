import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const BTN: ViewStyle = {
  flex: 1,
  paddingVertical: 10,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
}

export const BTN_LABEL: TextStyle = {
  color: color.background,
}

export const CALL: ViewStyle = {
  backgroundColor: color.blue,
  marginRight: 15,
}
export const CHAT: ViewStyle = {
  backgroundColor: color.palette.fountainBlue,
}
export const ICON: StyleProp<ImageStyle> = {
  marginHorizontal: 10,
}
