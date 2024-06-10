import { Dimensions, I18nManager, Platform, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const OPTIONS: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  maxWidth: 600,
  minWidth: Dimensions.get("window").width - 40,
}

export const FULL_WIDTH: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  minWidth: Dimensions.get("window").width - 40,
}

export const SCROLL: ViewStyle = {
  flexDirection: I18nManager.isRTL && Platform.OS === "android" ? "row-reverse" : "row",
}

export const FIXED: ViewStyle = {
  flexWrap: "wrap",
}

export const SUBTITLE: TextStyle = {
  fontSize: 8,
  color: color.dim,
}
