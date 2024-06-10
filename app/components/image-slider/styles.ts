import { Dimensions,ViewStyle } from "react-native"

import { spacing } from "../../theme"

export const HEADER: ViewStyle = {
  position: 'absolute',
  top: 0,
  zIndex: 10,
}

export const CROSS_ICON_CTR: ViewStyle = {
  paddingLeft: spacing[3],
  marginTop: spacing[7],
  paddingBottom: spacing[4],
  paddingRight: spacing[3],
}
