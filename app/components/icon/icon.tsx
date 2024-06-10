import * as React from "react"
import { ImageStyle, TouchableOpacity,View } from "react-native"

import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle, onPress, disabled } = props
  
  return onPress ? (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </TouchableOpacity>
  ) : (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}
