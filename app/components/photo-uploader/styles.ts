import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const ICON_CONTAINER: ViewStyle = {
  borderRadius: 50,
  width: 80,
  height: 80,
  backgroundColor: color.uploader,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
}

export const LABEL: TextStyle = {
  color: color.uploader,
}
export const RED_TEXT: TextStyle = {
  color: color.palette.redSalsa,
}

export const CONTAINER: ViewStyle = {
  alignItems: "center",
}

export const AVATAR: any = {
  borderRadius: 50,
  width: 80,
  height: 80,
  alignSelf: "center",
  marginBottom: 16,
}
export const CAMERA_ICON_BLOCK: ViewStyle = {
  borderRadius: 50,
  width: 80,
  height: 80,
  alignSelf: "center",
  position: "absolute",
  backgroundColor: color.palette.lightGrey50,
  justifyContent: "center",
  alignItems: "center",
}
