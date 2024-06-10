import React, { FC } from "react"
import { Image, TouchableOpacity } from "react-native"

import { ROW_NO_RTL } from "../../common_styles"
import { Text } from "../text/text"
import { CONTAINER, IMAGE, TEXT } from "./styles"

type SelectButtonProps = {
  text: string
  active: boolean
  onSelect: (v: boolean) => void
  icon?: string
}

export const SelectButton: FC<SelectButtonProps> = ({ text, active, onSelect, icon }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(active)} style={[CONTAINER(active), ROW_NO_RTL]}>
      {!!icon && <Image style={IMAGE} source={{ uri: icon }} />}
      <Text preset="input" style={TEXT(active)}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}
