import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const NO_AD_TITLE: TextStyle = {
  fontSize: 24,
  color: color.palette.fountainBlue,
  textAlign: "center",
  fontWeight: "700",
  maxWidth: 200
}

export const NO_AD_TEXT: TextStyle = {
  textAlign: "center",
  fontSize: 16,
  color: color.palette.lightGrey,
  maxWidth: 280
}

export const FILTER: StyleProp<ImageStyle> = {
  marginLeft: 20
}

export const CONTAINER_NO_POSTS: ViewStyle = {
  alignItems: 'center',
  marginTop: 50
}