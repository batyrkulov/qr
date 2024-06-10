import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { CONTAINER } from "./styles"

type NoticeProps = {
  styles?: ViewStyle
}

export const Notice: FC<NoticeProps> = ({ children, styles }) => {
  return <View style={[CONTAINER, styles]}>{children}</View>
}
