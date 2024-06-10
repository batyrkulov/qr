import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../../theme"

export const PICKER: ViewStyle = {
  marginBottom: 16,
}

export const SWITCH_CONTAINER: ViewStyle = {
  position: "absolute",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  elevation: 3,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 12,
  backgroundColor: color.background,
  shadowColor: "rgba(68, 79, 117)",
  shadowOpacity: 0.1,
  shadowRadius: 20,
  bottom: 16,
  width: "100%",
  alignSelf: "center",
  borderWidth: 1,
  borderColor: color.palette.blackSqueeze,
}

export const TOAST_CONTAINER: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.1)",
}

export const TOAST: ViewStyle = {
  alignSelf: "center",
  backgroundColor: "#2c2c2c",
  padding: 10,
  borderRadius: 8,
}

export const TOAST_TEXT: TextStyle = {
  color: "#fff",
  fontSize: 14,
}
