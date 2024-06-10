import React, { FC } from "react"
import { TouchableOpacity } from "react-native"
import { RadioButton, RadioButtonInput,RadioButtonLabel } from "react-native-simple-radio-button"

import { CONTAINER,RADIO, RADIO_LABEL, RADIO_LABEL_ACTIVE } from "./styles"

export type RadioOption = { label: string; value: string | number; icon?: React.ReactElement }

export type RadioProps = {
  options: RadioOption
  isActive?: boolean
  onPress: (v: string | number) => void
}

export const Radio: FC<RadioProps> = ({ options, isActive, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(options.value)} style={CONTAINER}>
      <RadioButton style={RADIO}>
        <RadioButtonLabel
          onPress={onPress}
          labelStyle={isActive ? RADIO_LABEL_ACTIVE : RADIO_LABEL}
          obj={options}
          isSelected={isActive}
        />
        <RadioButtonInput onPress={onPress} buttonSize={14} obj={options} isSelected={isActive} />
      </RadioButton>
    </TouchableOpacity>
  )
}
