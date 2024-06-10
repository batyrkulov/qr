import { TextStyle,ViewStyle } from "react-native"

import { color } from "../../theme"

export const CONTAINER: ViewStyle = {
  flex: 1,
}

export const RADIO: ViewStyle = {
  justifyContent: "space-between",
  width: "100%",
  paddingBottom: 24,
  paddingTop: 16,
}

export const RADIO_LABEL: TextStyle = {
  color: color.placeholder,
}

export const RADIO_LABEL_ACTIVE: TextStyle = {
  color: color.text,
}
