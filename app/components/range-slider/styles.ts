import { ViewStyle } from "react-native"

import { color } from "../../theme"

export const RAIL: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  height: 2,
}
export const RAIL_SELECTED: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.blue,
  height: 2,
}
export const THUMB: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.blue,
  width: 20,
  height: 20,
  borderRadius: 10,
}

export const SPACER: ViewStyle = {
  width: 10,
}
