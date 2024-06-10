import { I18nManager, ImageStyle, Platform, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color, typography } from "../../theme"

export const CONTAINER = (error: boolean): ViewStyle => ({
  flexDirection: "row",
  borderWidth: 1,
  borderColor: error ? color.error : color.inputBorder,
  borderRadius: 12,
  backgroundColor: color.background,
  paddingRight: 10,
  height: 44,
})

export const TEXT_CODE: TextStyle = {
  color: color.blue,
  fontSize: 12,
  fontWeight: "600",
  marginLeft: I18nManager.isRTL ? 12 : 18,
  marginRight: I18nManager.isRTL ? 18 : 12,
  marginTop: 'auto',
  marginBottom: 'auto',
}

export const TEXT_INPUT: TextStyle = {
  flex: 1,
  fontSize: 12,
  fontFamily: typography.primary,
}

export const CODE_INPUT: ViewStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  width: "100%",
  paddingHorizontal: 0,
  paddingVertical: 0,
  borderWidth: 0,
  justifyContent: "center",
  height: "100%",
}

export const CODE_INPUT_TEXT: TextStyle = {
  color: color.blue,
}

export const CODE_INPUT_ICON: StyleProp<ImageStyle> = {
  bottom: 4,
}

export const CODE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems:'center',
  justifyContent:'center'
}

export const NUMBER_INPUT: TextStyle = {
  flex: 4,
  borderLeftWidth: !(Platform.OS === "android" && I18nManager.isRTL) ? 1 : 0,
  borderRightWidth: Platform.OS === "android" && I18nManager.isRTL ? 1 : 0,
  borderLeftColor: color.divider,
  borderRightColor: color.divider,
  paddingHorizontal: 20,
  color: color.text,
}

export const LABEL: TextStyle = {
  marginBottom: 8,
}
