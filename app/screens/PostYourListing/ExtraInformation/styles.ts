import { ViewStyle } from "react-native"

import { color } from "../../../theme"

export const ROW: ViewStyle = {
  flexDirection: "row",
}

export const ROW_CHILD: ViewStyle = {
  flex: 1,
}

export const MARGIN_RIGHT = (v: number): ViewStyle => ({
  marginRight: v,
})

export const DIVIDER: ViewStyle = {
  height: 1,
  width: "100%",
  marginTop: 16,
  marginBottom: 20,
  backgroundColor: color.palette.blackSqueeze,
}

export const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}
