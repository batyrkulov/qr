import { ViewStyle } from "react-native"

import { color } from "../../theme"

export const WRAPPER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  height: 105,
  backgroundColor: color.palette.white,
  paddingVertical: 10,
  paddingHorizontal: 5,
  shadowColor: "rgb(176, 181, 207)",
  shadowOpacity: 0.1,
}
export const TAB_BTN: ViewStyle = {
  justifyContent: "center",
}
