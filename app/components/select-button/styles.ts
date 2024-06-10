import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const CONTAINER = (active: boolean): ViewStyle => ({
  backgroundColor: active ? color.palette.onahaua : color.background,
  paddingHorizontal: 8,
  paddingVertical: 8,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: color.palette.blackSqueeze,
  marginBottom: 4
})

export const TEXT = (active: boolean): TextStyle => ({
  color: !active ? color.dim : color.palette.scienceBlue,
  fontWeight: "600",
  lineHeight: 22
})

export const IMAGE: ImageStyle = {
  width: 20,
  height: 20,
  marginRight: 5
}
