import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../../theme"

export const DESCRIPTION_FIELD: any = {
  height: 110,
  textAlignVertical: "top",
}
export const MY_TICKET_BTN: ViewStyle = {
  borderWidth: 1,
  borderColor: color.palette.blue,
  borderRadius: 12,
  paddingVertical: 8,
  alignItems: "center",
  // marginTop: 100,
}
export const MY_TICKET_TEXT: TextStyle = {
  color: color.palette.blue,
}

export const STATUS_MODAL_TEXT: TextStyle = {
  paddingHorizontal: 20,
  marginTop: 16,
}
