import React from "react"
import { View, ViewStyle } from "react-native"
import Switcher, { ISwitchSelectorProps } from "react-native-switch-selector"

import { color } from "../../theme"
import { CONTAINER, TEXT } from "./styles"

interface SwitchSelectorInterface extends ISwitchSelectorProps {
  wrapperStyle?: ViewStyle
}

const Component = ({ wrapperStyle, ...rest }: SwitchSelectorInterface): React.ReactElement => {
  return (
    <View style={wrapperStyle}>
      <Switcher
        initial={0}
        backgroundColor={color.palette.blackSqueeze}
        hasPadding={false}
        borderColor={color.palette.blackSqueeze}
        borderRadius={10}
        height={36}
        buttonColor={color.palette.white}
        textStyle={TEXT}
        selectedTextStyle={TEXT}
        style={CONTAINER}
        {...rest}
      />
    </View>
  )
}
export const SwitchSelector = React.memo(Component)
