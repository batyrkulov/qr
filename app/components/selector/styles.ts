import { I18nManager, ImageStyle, StyleProp } from "react-native"

export const ICON: StyleProp<ImageStyle> = {
  position: "absolute",
  right: 8,
  bottom: 6,
}

export const ROTATE: StyleProp<ImageStyle> = {
  transform: I18nManager.isRTL ? [{ rotate: "90deg" }] : [{ rotate: "-90deg" }],
}
