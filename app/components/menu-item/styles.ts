import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const CONTAINER: ViewStyle = {
  alignItems: "center",
  width: 72,
}

export const ICON_CONTAINER: ViewStyle = {
  borderRadius: 50,
  shadowColor: "rgb(68, 79, 117)",
  shadowOpacity: 0.25,
  width: 70,
  height: 70,
  marginTop: Platform.OS === "ios" ? 8 : 0,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  elevation: 2,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  backgroundColor: color.background,
}

export const ICON: ImageStyle = {
  width: Platform.OS === "ios" ? 70 : 55,
  height: Platform.OS === "ios" ? 70 : 55,
  resizeMode: 'contain'
}

export const LABEL: TextStyle = {
  color: color.menuItem,
  textAlign: "center",
  lineHeight: 16,
}

export const SELECTED: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: 70,
  height: 70,
  transform: [{ translateX: 0 }],
  backgroundColor: color.blue,
  shadowColor: "rgb(68, 79, 117)",
  shadowRadius: 20,
  shadowOpacity: 0.4,
  elevation: 3,
  opacity: 0.2,
  borderRadius: 50,
}
