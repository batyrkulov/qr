import { I18nManager, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const SCREEN: ViewStyle = {
  paddingHorizontal: 20,
  marginTop: 25,
}

export const CARD: ViewStyle = {
  width: 160,
  height: 160,
  borderRadius: 12,
}

export const GRADIENT: ViewStyle = {
  borderRadius: 12,
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}

export const FIRST: ViewStyle = {
  marginRight: I18nManager.isRTL ? 0 : 20,
}

export const SECOND: ViewStyle = {
  marginRight: I18nManager.isRTL ? 20 : 0,
  marginLeft: I18nManager.isRTL ? 20 : 0,
}

export const THIRD: ViewStyle = {
  marginRight: I18nManager.isRTL ? 10 : 0,
}

export const SELECTED: ViewStyle = {
  borderWidth: 4,
  borderColor: color.uploader,
  borderRadius: 14,
}

export const BTN_TEXT: TextStyle = {
  marginTop: 16,
  fontWeight: "bold",
  color: color.menuItem,
}

export const CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent:'flex-start',
  width:'90%',
  alignSelf:'center'
}

export const TEXT: TextStyle = {
  marginBottom: 16,
}

export const HEADER: ViewStyle = {
  flexDirection: "row",
}

export const ICON: StyleProp<ImageStyle> = {
  marginHorizontal: 10,
  marginTop: 11,
}
