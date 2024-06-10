import { ViewStyle } from "react-native"

import { color } from "../../theme"

export const FOOTER: ViewStyle = {
  backgroundColor: color.background,
  height: 110,
  paddingTop: 16,
  paddingHorizontal: 20,
  paddingBottom: 16,
  borderTopColor: "#B0B5CF",
  borderTopWidth: 0.3,
}

export const SPACER: ViewStyle = {
  height: 100,
}

export const FIXED: ViewStyle = {
  position: "absolute",
  bottom: 20,
  left: 0,
  right: 0,
}
