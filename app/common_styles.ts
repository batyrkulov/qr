import { I18nManager, TextStyle, ViewStyle } from "react-native"

import { color } from "./theme"

export const MARGIN_BOTTOM = (margin: number): ViewStyle => ({
  marginBottom: margin,
})

export const INFO_TEXT: TextStyle = {
  color: color.blue,
}
export const INFO_LEFT: ViewStyle = {
  marginRight: 4,
  marginLeft: 4,
}

export const ROW: ViewStyle = {
  flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  alignItems: "center",
}
export const ROW_NO_RTL: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const SPACE_BETWEEN: ViewStyle = { justifyContent: "space-between" }

export const WRAP: ViewStyle = {
  flexWrap: "wrap",
}

export const FLEX = (value: number): ViewStyle => ({
  flex: value,
})

export const COLOR = (value: string): TextStyle => ({
  color: value,
})

export const ROTATE_RTL_180: ViewStyle = {
  transform: [{ rotate: I18nManager.isRTL ? "180deg" : "0deg" }],
}
