import { ViewStyle } from "react-native"

export const ITEM = (isFullWidth: boolean): ViewStyle => ({
  width: isFullWidth ? "100%" : "48%",
})
