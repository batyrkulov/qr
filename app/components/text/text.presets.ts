import { TextStyle } from "react-native"

import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
  textAlign: "left",
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontFamily: typography.bold } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: 24, fontFamily: typography.bold } as TextStyle,

  header2: { ...BASE, fontSize: 18, fontFamily: typography.bold } as TextStyle,

  header4: { ...BASE, fontSize: 14, fontFamily: typography.bold } as TextStyle,

  subheader: { ...BASE, fontSize: 16, color: color.dim } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 12, color: color.dim, textAlign: "left" } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 12, color: color.dim } as TextStyle,

  placeholder: { ...BASE, fontSize: 12, color: color.placeholder } as TextStyle,
  input: { ...BASE, fontSize: 12, lineHeight: 16 } as TextStyle,
  inputBold: { ...BASE, fontSize: 12, fontFamily: typography.bold, lineHeight: 16 } as TextStyle,
  error: { ...BASE, fontSize: 12, fontFamily: typography.bold, color: color.error } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
