import { Dimensions, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const REFRESH_LISTING_BTN: ViewStyle = {
  paddingVertical: 10,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  backgroundColor: color.blue,
  height: 44,
}

export const REFRESH_LISTING_BTN_LABEL: TextStyle = {
  color: color.background,
}

export const BODY: ViewStyle = {
  paddingTop: 0,
}

export const SLIDER_CONTAINER: ViewStyle = {
  width: "100%",
}

export const PAGINATION: ViewStyle = {
  bottom: -35,
}

export const DESCRIPTION_CTR: TextStyle = {
  alignItems: "center",
  paddingHorizontal: 0,
}

export const REPORT: ViewStyle = {
  alignSelf: "center",
}

export const REPORT_TEXT: TextStyle = {
  fontSize: 14,
  color: color.error,
  fontWeight: "600",
}

export const SUBHEADER: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
}

export const DESCRIPTION_TEXT: TextStyle = {
  textAlign: "center",
}

export const SLIDER_ITEM: ViewStyle = {
  width: "48%",
  height: "100%",
}

export const MAP_CONTAINER: ViewStyle = {
  height: 160,
  width: "100%",
  marginBottom: 10,
  borderRadius: 12,
  overflow: "hidden",
}
export const MAP: ViewStyle = { width: "100%", height: 160, borderRadius: 12 }
export const OTHER_POSTS_TITLE: ViewStyle = { paddingHorizontal: 20 }
