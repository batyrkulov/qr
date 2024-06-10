import { I18nManager,TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

export const TEXT: TextStyle = {
  marginBottom: 16,
}

export const INPUT: ViewStyle = {
  marginBottom: 16,
}

export const TEXTAREA: TextStyle = {
  borderColor: color.inputBorder,
  borderWidth: 1,
  borderRadius: 12,
  height: 150,
  textAlignVertical: "top",
  textAlign: I18nManager.isRTL ? "right" : "left",
  padding: 20,
  paddingTop: 10,
  color: color.text,
}

export const BTN: ViewStyle = {
  alignSelf: "center",
}

export const MEDIA: ViewStyle = {
  marginBottom: 16,
}

export const CONTAINER: ViewStyle = {
  marginTop: 16,
}

export const CONTAINER_EXTRA: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}

export const DIVIDER: ViewStyle = {
  height: 1,
  width: "100%",
  marginTop: 16,
  marginBottom: 20,
  backgroundColor: color.palette.blackSqueeze,
}
