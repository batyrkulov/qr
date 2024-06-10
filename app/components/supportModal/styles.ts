import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const ITEM_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 16,
}
export const LIST_CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
}
export const ITEM_TEXT: TextStyle = {
  color: color.palette.manatee,
}
export const FLAT_LIST: ViewStyle = {
  marginTop: 16,
}
export const SEPARATOR: ViewStyle = {
  height: 1,
  backgroundColor: color.palette.blackSqueeze,
}
