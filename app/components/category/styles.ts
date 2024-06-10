import { Dimensions, I18nManager, ImageStyle, Platform, StyleProp, ViewStyle } from "react-native"

export const CONTAINER: ViewStyle = {
  flexDirection: I18nManager.isRTL && Platform.OS === "android" ? "row-reverse" : "row",
  width: Dimensions.get('screen').width
}

export const SCROLL_CONTENT: ViewStyle = {
  flexDirection: 'row',
  minWidth: Dimensions.get('screen').width,
}

export const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const SEARCH: StyleProp<ImageStyle> = {
  width: 24,
  height: 24,
}

export const SCROLL: ViewStyle = {
  flexDirection: "row",
}
