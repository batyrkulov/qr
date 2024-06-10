import React, { FC } from "react"
import { TextStyle } from "react-native"

import { TextField, TextFieldProps } from "../text-field/text-field"
import { INPUT, INPUT_CONTAINER } from "./styles"

export const Input: FC<TextFieldProps> = ({ ...rest }) => {
  return (
    <TextField
      {...rest}
      inputStyle={{ ...INPUT, ...(rest.inputStyle as TextStyle) }}
      inputContainerStyle={{...INPUT_CONTAINER(!!rest.error, rest.multiline), ...rest.inputContainerStyle}}
    />
  )
}
