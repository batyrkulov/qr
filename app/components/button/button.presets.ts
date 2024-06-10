import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  fontSize: 14,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */

export const viewPresets: {
  primary: ViewStyle
  link: ViewStyle
  search: ViewStyle
} = {
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.palette.orange,
  },
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  },
  search: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: color.inputBorder,
    borderWidth: 0.5,
    borderRadius: 12,
    width: "100%",
    height: 42,
  },
}

export const textPresets: {
  primary: TextStyle
  link: TextStyle
  search: TextStyle
} = {
  primary: {
    ...BASE_TEXT,
    fontSize: 9,
    color: color.palette.white,
  },
  link: {
    ...BASE_TEXT,
    color: color.dim,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  search: {
    ...BASE_TEXT,
    color: color.placeholder,
    fontSize: 12,
  },
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
