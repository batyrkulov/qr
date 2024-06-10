import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const WRAPPER: ViewStyle = {
  borderColor: color.palette.blackSqueeze,
  borderWidth: 1,
  borderRadius: 12,
  padding: 10,
  backgroundColor: color.background,
}
export const ROW: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
export const ROTATE_90: ViewStyle = {
  transform: [{ rotate: "90deg" }],
  marginRight: 10,
}
export const ROTATE_270: ViewStyle = {
  transform: [{ rotate: "-90deg" }],
  marginRight: 10,
}
export const TITLE: TextStyle = {
  color: color.blue,
  fontSize: 13,
  maxWidth: "75%",
}
export const TEXT: TextStyle = {
  color: color.palette.lightGrey,
  fontSize: 13,
  marginTop: 16,
}
export const DARK_TEXT: TextStyle = {
  color: color.palette.midnightBlue,
}
