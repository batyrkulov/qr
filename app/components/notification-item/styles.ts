import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const TEXT: TextStyle = {
  color: color.text,
  lineHeight: 18
}
export const TEXT_ACTIVE: TextStyle = {
  color: color.blue,
  lineHeight: 18
}
export const TIME: TextStyle = {
  color: color.dim,
  fontSize: 12,
}

export const FROM: TextStyle = {
  fontSize: 14,
  marginRight: 10
}
export const INFO: TextStyle = {
  fontSize: 12,
}

export const HEADER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const ROOT: ViewStyle = {
  flexDirection: "row",
}

export const CIRCLE: ViewStyle = {
  backgroundColor: color.inputBorder,
  width: 12,
  height: 12,
  borderRadius: 12,
  marginRight: 12
}

export const CIRCLE_ACTIVE: ViewStyle = {
  backgroundColor: color.blue,
  width: 12,
  height: 12,
  borderRadius: 12,
  marginRight: 12
}
