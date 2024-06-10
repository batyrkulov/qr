import { TextStyle } from "react-native"

import { color } from "../../theme"

export const INPUT = {
  fontSize: 12,
}

export const INPUT_CONTAINER = (error: boolean, isMultiline = false): TextStyle => ({
  borderWidth: 1,
  borderColor: error ? color.error : color.inputBorder,
  borderRadius: 12,
  backgroundColor: color.background,
  ...(isMultiline ? {} : { height: 44 }),
  paddingHorizontal: 15,
})
