import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const BTN: ViewStyle = {
  alignSelf: "center",
}

export const PHOTO_ERROR: TextStyle = {
  alignSelf: "center",
}
export const CHANGE_PASS_BTN: ViewStyle = {
  height: 50,
  borderWidth: 1,
  borderColor: color.blue,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
}

export const DIVIDER: ViewStyle = {
  marginTop: 16,
  marginBottom: 16,
  height: 1,
  width: "100%",
  backgroundColor: color.palette.blackSqueeze,
}

export const CHANGE_BTN: ViewStyle = {
  paddingVertical: 10,
}
export const BLUE_TEXT: TextStyle = {
  color: color.blue,
}

export const HORIZONTAL_LINE: ViewStyle = {
  backgroundColor: color.palette.blackSqueeze,
  height: 1,
  marginBottom: 16,
}
export const SCROLL_CONTAINER: ViewStyle = {
  paddingBottom: 26,
}
export const DELETE_ACC_TEXT: TextStyle = {
  color: color.palette.redSalsa,
  marginTop: 16,
}
export const DELETE_BTN: ViewStyle = {
  alignSelf: "center",
}
export const LOADER: ViewStyle = {
  width: 80,
  height: 80,
  alignSelf: "center",
}

export const MODAL: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  borderWidth: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
}

export const MODAL_CONTENT: ViewStyle = {
  backgroundColor: color.background,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: "center",
}
export const MODAL_BTN_TEXT: TextStyle = { fontSize: 18 }
export const MODAL_CONTROLS: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 200,
}
