import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const SELECTOR_WRAPPER: ViewStyle = {
  height:32,
  width: 110,
}

export const INPUT_STYLE: ViewStyle = {
  justifyContent: "center",
  width: "100%",
  height: "100%",
  borderWidth: 0,
}
export const CONTAINER_STYLE: ViewStyle = {
  flex: 1,
}
export const TEXT_LABEL_STYLE: TextStyle = {
  color: color.palette.fountainBlue,
  fontSize: 16,
}
