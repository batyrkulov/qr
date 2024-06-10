import { ImageStyle, StyleProp, ViewStyle } from "react-native"

export const HEADER: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20
}

export const ICON = (isExpanded: boolean): StyleProp<ImageStyle> => ({
  transform: !isExpanded ? [] : [{ rotate: "180deg" }],
})
