import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const CONTAINER = (error): ViewStyle => ({
  alignItems: "center",
  justifyContent: "center",
  height: 160,
  width: 160,
  backgroundColor: color.background,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: !error ? color.palette.blackSqueeze : color.error,
  elevation: 3,
  shadowColor: "rgb(68, 79, 117)",
  shadowRadius: 20,
  shadowOpacity: 0.1,
})

export const TITLE: TextStyle = {
  fontWeight: "bold",
  marginTop: 8
}

export const TEXT: TextStyle = {
  textAlign: "center",
  color: color.placeholder,
  maxWidth: 136,
}

export const ICON: StyleProp<ImageStyle> = {
  width: 24,
  height: 24,
}
