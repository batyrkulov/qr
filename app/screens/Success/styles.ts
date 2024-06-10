import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

export const BODY: ViewStyle = {
  alignItems: "center",
  paddingTop: 75,
}

export const BUTTON: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}

export const TITLE: TextStyle = {
  marginBottom: 16,
}

export const SUBTITLE: TextStyle = {
  marginBottom: 34,
  maxWidth: 200,
  textAlign: 'center'
}

export const ICON: StyleProp<ImageStyle> = {
  marginRight: 5,
}
