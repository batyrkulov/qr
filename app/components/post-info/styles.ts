import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const ROOT: ViewStyle = {
  backgroundColor: color.background,
  shadowColor: "rgb(176, 181, 207)",
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 1,
  elevation: 3,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: color.palette.blackSqueeze,
  paddingHorizontal: 35,
  paddingVertical: 16,
}

export const ITEM: ViewStyle = {
  width: "33%",
  marginBottom: 16,
}

export const BTN_TEXT: TextStyle = {
  fontSize: 16,
  color: color.palette.fountainBlue,
  marginRight: 10,
}

export const BTN: ViewStyle = {
  alignSelf: "center",
}

export const FEATURES_CONTAINER: ViewStyle = {
  backgroundColor: "#FAFAFA",
  borderRadius: 6,
  padding: 8,
  marginBottom: 8,
  width: "100%",
}

export const FEATURE_ICON: StyleProp<ImageStyle> = {
  marginHorizontal: 10,
  width: 18,
  height: 18
}
