import { Dimensions, TextStyle, ViewStyle } from "react-native"

import { color } from "../../theme"
const HEIGHT = Dimensions.get("screen").height

export const MODAL: ViewStyle = {
  justifyContent: "flex-end",
  margin: 0,
}
export const CONTAINER: ViewStyle = {
  height: HEIGHT * 0.85,
  backgroundColor: color.background,
  paddingTop: 16,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
}
export const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingBottom: 16,
}
export const MODAL_CONTROLS: TextStyle = {
  color: color.modalControls,
}
export const HIDE: ViewStyle = {
  opacity: 0,
}
export const ITEM_WRAPPER: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 10,
  paddingRight: 10,
  borderBottomWidth: 1,
  borderColor: color.palette.blackSqueeze,
}
export const BOTTOM_TEXT: TextStyle = {
  marginTop: 10,
  fontSize: 13,
}
export const PRICE_TEXT: TextStyle = {
  color: color.blue,
  fontSize: 15,
}
export const INFO_BLOCK: ViewStyle = {
  marginLeft: 10,
  flex: 1,
}
export const LIST_WRAPPER: ViewStyle = {
  paddingHorizontal: 18,
}
export const LIST_CONTAINER: ViewStyle = {
  paddingBottom: 15,
}
export const PAY_BTN_WRAPPER: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 10,
}
