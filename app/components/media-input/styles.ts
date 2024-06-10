import { ImageStyle, StyleProp, ViewStyle } from "react-native"

export const CARDS_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

export const IMAGE: ImageStyle = {
  height: 160,
  width: "100%",
  borderRadius: 14
}
export const IMAGE_CONTAINER = {
  height: 160,
  marginBottom: 20,
  width: "45%",
}

export const DELETE: StyleProp<ImageStyle> = {
  position: "absolute",
  zIndex: 1000,
  bottom: 5,
  right: 10,
}

export const DELETE_ICON: StyleProp<ImageStyle> = {
  width: 40,
  height: 40,
}

export const SPACE: ViewStyle = {
  width: 15,
}
