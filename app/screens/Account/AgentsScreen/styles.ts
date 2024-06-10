import { TextStyle, ViewStyle } from "react-native"

import { color } from "../../../theme"

export const AGENT_WRAPPER: ViewStyle = {
  width: "48%",
  alignItems: "center",
  marginRight: "4%",
  padding: 16,
  borderWidth: 1,
  borderRadius: 12,
  borderColor: color.palette.blackSqueeze,
  marginBottom: "4%",
}
export const AGENT_PHOTO = {
  width: 80,
  height: 80,
  borderRadius: 40,
}
export const NAME_TEXT: TextStyle = {
  textAlign: "center",
  color: color.palette.eastBay,
  fontWeight: "bold",
  marginVertical: 16,
  lineHeight: 22,
}

export const CONTACT_ITEM: ViewStyle = {
  paddingVertical: 20,
}
export const CONTACT_ITEM_TEXT: TextStyle = {
  color: color.palette.manatee,
}
export const HORIZONTAL_LINE: ViewStyle = {
  height: 1,
  backgroundColor: color.palette.blackSqueeze,
}
export const WRAPPER_CONTACT_ITEM: ViewStyle = {
  paddingHorizontal: 20,
}
