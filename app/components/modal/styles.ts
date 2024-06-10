import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
}

export const MODAL: ViewStyle = {
  justifyContent: "flex-end",
  margin: 0,
}

export const CONTAINER: ViewStyle = {
  height: 492,
  backgroundColor: color.background,
  paddingVertical: 16,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  zIndex: 10000
}

export const MODAL_CONTROLS: TextStyle = {
  color: color.modalControls,
  marginTop: 4
}
export const OPACITY_0: ViewStyle = {
  opacity: 0,
}
