import { I18nManager, ImageStyle, StyleProp, ViewStyle } from "react-native"

export const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24
}

export const ICON: StyleProp<ImageStyle> = {
  width: 24,
  height: 24,
}

export const ICON_BACK: StyleProp<ImageStyle> = {
  transform: I18nManager.isRTL ? [{rotateY: '180deg'}] : []
}