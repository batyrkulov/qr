import { I18nManager, ImageStyle, TextStyle } from "react-native"

export const AVATAR: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: !I18nManager.isRTL ? 10 : 0,
  marginLeft: I18nManager.isRTL ? 10 : 0,
}

export const TIME: TextStyle = {
  alignSelf: "flex-start",
}
