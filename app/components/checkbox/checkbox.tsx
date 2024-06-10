import CheckBox from "@react-native-community/checkbox"
import * as React from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"

import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import { CheckboxProps } from "./checkbox.props"

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing[1],
  alignSelf: "flex-start",
  alignItems: "center",
}

const CHECKBOX: ViewStyle = {
  width: 16,
  height: 16,
}

const LABEL: TextStyle = { paddingLeft: 20, fontSize: 16 }

export function Checkbox(props: CheckboxProps) {
  const [active, setActive] = React.useState(false)
  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = [ROOT, props.style]

  const onPress = () => {
    setActive(!active)
    props.onToggle(!active)
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <CheckBox
        onValueChange={props.onToggle}
        value={props.value}
        boxType="square"
        tintColor={color.placeholder}
        onFillColor={color.palette.green}
        onCheckColor={color.background}
        onTintColor={color.palette.green}
        animationDuration={0.1}
        tintColors={{ true: color.palette.green, false: color.placeholder }}
        onAnimationType="fade"
        offAnimationType="fade"
        style={CHECKBOX}
      />
      <Text text={props.text} numberOfLines={numberOfLines} style={LABEL} />
    </TouchableOpacity>
  )
}
