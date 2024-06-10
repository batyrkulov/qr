import { TextStyle, ViewStyle } from "react-native"

import { color, typography } from "../../theme"

export const TEXT: TextStyle = {
  fontFamily: typography.bold,
  color: color.text,
  fontSize: 12,
}
export const CONTAINER: ViewStyle = {
  padding: 2,
  backgroundColor: color.palette.blackSqueeze,
  borderRadius: 10,
}
