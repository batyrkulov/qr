import { ImageStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const PAYMENT_ITEM: ViewStyle = {
  justifyContent: "space-between",
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom: 10,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: color.inputBorder,
}

export const PAYMENT_ITEM_IMAGE: ImageStyle = {
  width: 40,
  height: 40,
  resizeMode: "contain",
}
