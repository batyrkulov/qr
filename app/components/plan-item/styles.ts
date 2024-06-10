import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { color, typography } from "../../theme"

export const BUTTON: ViewStyle = {
  borderWidth: 1,
  marginRight: 10,
  marginTop: 25,
}

export const LABEL_ACTIVE: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 18,
  lineHeight: 22,
  color: color.text,
  fontWeight: "bold",
  textAlign: "left",
}
export const LABEL: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 18,
  lineHeight: 22,
  color: color.menuItem,
  fontWeight: "bold",
}
export const LABEL_WRAPPER: ViewStyle = {
  marginHorizontal: 8,
}

export const PRICE: TextStyle = {
  color: color.blue,
  fontWeight: "bold",
}

export const RADIO: ViewStyle = { flexDirection: "row", flex: 1 }

export const CONTAINER = (isActive: boolean): ViewStyle => ({
  backgroundColor: isActive ? color.plan : color.transparent,
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 5,
  marginBottom: 8,
})

export const FEATURE: TextStyle = {
  color: color.background,
  backgroundColor: color.palette.green,
  padding: 4,
  borderRadius: 4,
  fontSize: 10,
}

export const ICON: ImageStyle = { width: 50, height: 50, marginBottom: 10, resizeMode: "center" }
