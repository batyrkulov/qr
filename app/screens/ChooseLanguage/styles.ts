import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const BUTTON: ViewStyle = {
  borderRadius: 12,
  shadowColor: "rgb(68, 79, 117)",
  shadowRadius: 20,
  shadowOpacity: 0.3,
  elevation: 3,
  width: "100%",
  height: 44,
}

export const BUTTON_TEXT: TextStyle = {
  fontSize: 14,
  color: color.background,
}

export const BUTTON_EN: ViewStyle = {
  backgroundColor: color.palette.blue,
}
export const BUTTON_AR: ViewStyle = {
  backgroundColor: color.palette.fountainBlue,
}

export const BODY: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: 77,
  paddingBottom: 260,
}

export const MAIN: ViewStyle = {
  width: "100%",
  alignItems: "center",
}
