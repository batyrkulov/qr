import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../../theme"

export const FOOTER: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
}

export const BUTTON: ViewStyle = {
  borderWidth: 1,
  borderColor: color.palette.blue,
  backgroundColor: "transparent",
  marginRight: 20,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  padding: 10
}

export const BUTTON_TEXT: TextStyle = {
  color: color.palette.blue,
  lineHeight: 20
}

export const BTN: ViewStyle = {
  width: "100%",
}
