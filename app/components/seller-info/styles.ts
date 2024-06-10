import { I18nManager, ImageStyle, StyleProp, ViewStyle } from "react-native"

export const TRANSFORM: StyleProp<ImageStyle> = {
  transform: !I18nManager.isRTL ? [{ rotate: "-90deg" }] : [{ rotate: "90deg" }],
}

export const LINK_BTN: ViewStyle = {
  alignSelf: "center",
}
export const IMAGE: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
}
