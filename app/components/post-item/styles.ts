import { I18nManager, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { ImageStyle as ImageStyle2 } from 'react-native-fast-image'

import { color } from "../../theme"

export const CONTAINER: ViewStyle = {
  backgroundColor: color.background,
  borderRadius: 4,
  shadowColor: "rgb(68, 79, 117)",
  shadowOpacity: 0.1,
  shadowOffset: {
    width: 1,
    height: 1,
  },
  elevation: 3,
}

export const IMAGE: ImageStyle2 = {
  width: "100%",
  minHeight: 100,
  flex: 1,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
}

export const CONTENT: ViewStyle = {
  padding: 12,
}
export const ROW: ViewStyle = {
  flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  alignItems: "center",
  justifyContent: "space-between",
}
export const ROW_START: ViewStyle = {
  flexDirection: "row",
}
export const TEXT_ALIGN: TextStyle = {
  textAlign: I18nManager.isRTL ? "right" : "left",
}
export const TYPE_CARS: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 4,
  backgroundColor: color.palette.onahaua,
  borderRadius: 6,
}
export const TYPE_TEXT: TextStyle = {
  color: color.blue,
  fontWeight: "bold",
  fontSize: 13,
}

export const PLAN_ICON: ImageStyle = {
  width: 24,
  height: 18,
  resizeMode: "center",
}

export const SPACER: ViewStyle = {
  height: 21,
}

export const PRICE: TextStyle = { fontSize: 16, lineHeight: 20, fontWeight: "700", marginRight: 2 }
export const CURRENCY: TextStyle = {
  lineHeight: 17,
  fontSize: 12,
  fontWeight: "700",
  marginRight: 2,
}
