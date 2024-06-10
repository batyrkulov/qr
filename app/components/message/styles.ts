import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const MESSAGE: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 24,
  alignItems: "flex-end",
  maxWidth: "50%",
}

export const RECEIVED_MESSAGE: ViewStyle = {
  alignSelf: "flex-start",
  backgroundColor: color.divider,
  borderTopStartRadius: 4,
}

export const SENT_MESSAGE: ViewStyle = {
  backgroundColor: color.blue,
  borderTopEndRadius: 4,
  alignSelf: "flex-end",
}

export const MESSAGE_TEXT: TextStyle = {
  fontSize: 12,
}

export const RECEIVED_MESSAGE_TEXT: TextStyle = {
  color: "#444F75",
}
export const SENT_MESSAGE_TEXT: TextStyle = {
  color: color.background,
}

export const DATE: TextStyle = {
  fontSize: 8,
  marginHorizontal: 10,
  position: "absolute",
  bottom: 4,
  right: 4,
}

export const IMAGE: ImageStyle = {
  width: 100,
  height: 100,
  marginBottom: 10
}
