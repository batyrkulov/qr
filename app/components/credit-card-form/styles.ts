import { I18nManager, ViewStyle } from "react-native"

import { color } from "../../theme"

export const ROW: ViewStyle = {
  flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
}

export const INPUT: ViewStyle = {
  flex: 1,
}

export const TOTAL: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 16,
  backgroundColor: color.palette.blackSqueeze,
  borderRadius: 8,
  width: "100%",
}
