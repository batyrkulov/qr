import { TextStyle,ViewStyle } from "react-native"

import { color, typography } from "../../theme"

export const BTN: ViewStyle = {
  width: "100%",
  alignItems: "stretch",
  backgroundColor: color.transparent,
}

export const GRADIENT: ViewStyle = {
  borderRadius: 12,
  padding: 7,
}

export const BTN_TEXT: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary,
  fontWeight: "600",
  color: color.background,
  textAlign: "center",
}
