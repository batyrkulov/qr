import React, { FC } from "react"
import { Platform, View, ViewStyle } from "react-native"

import { FIXED, FOOTER, SPACER } from "./styles"

type FooterProps = {
  fixed?: boolean
  styles?: ViewStyle
}

export const Footer: FC<FooterProps> = ({ children, fixed, styles }) => {
  if (fixed) {
    return (
      <>
     
       <View style={SPACER} />
        <View style={[FOOTER, FIXED, styles]}>{children}</View>
  
      </>
    )
  }

  return <View style={[FOOTER, FIXED,styles]}>{children}</View>
}
