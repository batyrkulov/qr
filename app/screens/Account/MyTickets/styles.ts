import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../../theme"

export const ITEM_WRAPPER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 18,
  borderBottomWidth: 1,
  borderColor: color.palette.blackSqueeze,
}
export const ITEM_TEXT: TextStyle = {
  maxWidth: "70%",
}
