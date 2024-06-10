import { I18nManager, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const HEADER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 10,
  backgroundColor: color.background,
  height: 40,
  width: "100%",
}

export const RIGHT: ViewStyle = {
  marginHorizontal: 20,
}
export const LEFT: ViewStyle = {
  marginHorizontal: 20,
  transform: I18nManager.isRTL ? [{ rotate: "180deg" }] : [],
}
export const LEFT_BTN: ViewStyle = { padding: 10 }
export const RIGHT_ICONS_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: 20,
  width: 60,
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
}

export const RIGHT_TEXT_BTN_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: 20,
  justifyContent: "flex-end",
  height: "100%",
}

export const TEXT_BTN_CONTAINER: ViewStyle = {
  marginLeft: 25,
}

export const TITLE: TextStyle = {
  position: "absolute",
  textAlign: "center",
  width: "100%",
}

export const ICON: StyleProp<ImageStyle> = {
  width: 20,
  height: 20,
}
