import { I18nManager, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"

export const CONTAINER: ViewStyle = {
  marginTop: 16,
}

export const ITEM_MENU: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 64,
  borderBottomWidth: 1,
  borderColor: color.palette.blackSqueeze,
}
export const ITEM_NAME: TextStyle = {
  color: color.palette.manatee,
  marginLeft: 8,
}
export const BLUE_CIRCLE: ViewStyle = {
  width: 32,
  height: 32,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 16,
  backgroundColor: color.blue,
}

export const LEFT_SIDE: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const ROTATE_180 = {
  transform: I18nManager.isRTL ? [{ rotate: "180deg" }] : [],
}
