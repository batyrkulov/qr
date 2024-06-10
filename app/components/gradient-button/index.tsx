import React, { FC } from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { Text } from ".."
import { ButtonProps } from "../button/button.props"
import { BTN, BTN_TEXT, GRADIENT } from "./styles"

export const GradientButton: FC<ButtonProps & { gradientStyles?: ViewStyle }> = ({
  children,
  ...rest
}) => {
  const style = rest.style || {}
  return (
    <TouchableOpacity {...rest} style={[BTN, style]} onPress={rest.onPress}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        locations={[0.3, 1]}
        style={[GRADIENT, rest.gradientStyles]}
        colors={["#0892F9", "#87E4DB"]}
      >
        {children || <Text style={BTN_TEXT}>{rest.text}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  )
}
