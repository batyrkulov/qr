import React, { FC } from "react"
import { FieldError } from "react-hook-form"
import { ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Icon } from ".."
import { INPUT_CONTAINER } from "../input/styles"
import { LABEL } from "../phoneInput/styles"
import { Text } from "../text/text"
import { ICON, ROTATE } from "./styles"

type SelectorProps = {
  value?: string
  label?: string
  placeholder?: string
  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
  iconStyle?: StyleProp<ImageStyle>
  onPress?: () => void
  isSelect?: boolean
  textStyle?: TextStyle
  error?: FieldError
  disabled?: boolean
}

export const Selector: FC<SelectorProps> = ({
  value,
  label,
  placeholder,
  containerStyle,
  onPress,
  isSelect,
  inputStyle,
  iconStyle,
  textStyle,
  error,
  disabled,
}) => {
  const preset = value ? "input" : "placeholder"
  const styles = containerStyle
  const inner: ViewStyle = { justifyContent: "center", ...inputStyle }
  const textStyles = { ...textStyle, lineHeight: 22 }
  return (
    <View style={styles}>
      {!!label && (
        <View style={LABEL}>
          <Text preset="fieldLabel">{label}</Text>
        </View>
      )}
      <TouchableOpacity
        disabled={disabled}
        style={{ ...INPUT_CONTAINER(!!error), ...inner }}
        onPress={onPress}
      >
        <Text
          preset={preset}
          text={value || placeholder}
          style={textStyles}
        />
        {!disabled && (
          <Icon icon="arrowDown" style={isSelect ? [ICON, iconStyle] : [ICON, iconStyle, ROTATE]} />
        )}
      </TouchableOpacity>
      {error && <Text preset="error">{error.message}</Text>}
    </View>
  )
}
