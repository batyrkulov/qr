import React, { useEffect, useMemo, useState } from "react"
import { FieldError } from "react-hook-form"
import {
  I18nManager,
  ImageStyle,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import TextInputMask from "react-native-text-input-mask"

import { color, typography } from "../../theme"
import { Icon } from "../icon/icon"
import { IconTypes } from "../icon/icons"
import { Text } from "../text/text"

// the base styling for the TextInput
const INPUT_CONTAINER: ViewStyle = {
  minHeight: 44,
  backgroundColor: color.palette.white,
  zIndex: -1,
  flexDirection: "row",
  alignItems: "center",
}

const INPUT: TextStyle = {
  color: color.text,
  fontFamily: typography.primary,
  fontSize: 12,
  flex: 1,
  height: "100%",
}

export const RTL: TextStyle = {
  textAlign: "right",
  direction: "rtl",
}

const LABEL: ViewStyle = {
  marginBottom: 8,
  height: 20,
}
const CURRENCY: TextStyle = {
  color: color.palette.cadet,
  fontSize: 8,
}

const ICON: ImageStyle = { marginRight: 10 }
const ICON_NO_RTL: ImageStyle = { marginLeft: 10 }
const ICON_EYE: ImageStyle = {}
const COUNT: TextStyle = {
  fontSize: 8,
}
const ERROR: TextStyle = {
  color: color.error,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: string

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: string

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>
  inputContainerStyle?: ViewStyle

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any

  withToggleSecure?: boolean

  mask?: string

  error?: FieldError

  icon?: IconTypes
  noLabel?: boolean
  noRTL?: boolean
  withCurrency?: boolean
  maxLength?: number

  extraIcon?: () => React.ReactElement
}

enum IconState {
  VISIBLE = "visibility",
  VISIBLE_OFF = "visibility-off",
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    inputContainerStyle: inputContainerStyleOverride,
    forwardedRef,
    withToggleSecure,
    mask,
    error,
    icon,
    noLabel,
    noRTL,
    withCurrency,
    maxLength,
    extraIcon,
    ...rest
  } = props

  const currentLength = useMemo(() => (rest.value ? rest.value.length : 0), [rest.value])

  const [eyeIcon, setEyeIcon] = useState<IconState>(IconState.VISIBLE_OFF)
  const [isPassword, setIsPassword] = useState(withToggleSecure)
  const changePwdType = (): void => {
    "here"
    setIsPassword(!isPassword)
  }
  useEffect(() => {
    setEyeIcon(isPassword ? IconState.VISIBLE : IconState.VISIBLE_OFF)
  }, [isPassword])

  const containerStyles = [PRESETS[preset], styleOverride]
  const inputStyles =
    I18nManager.isRTL && !noRTL ? [INPUT, inputStyleOverride, RTL] : [INPUT, inputStyleOverride]
  const actualPlaceholder = placeholder
  const inputContainerStyle: ViewStyle =
    I18nManager.isRTL && noRTL
      ? { ...INPUT_CONTAINER, flexDirection: "row-reverse" }
      : INPUT_CONTAINER
  return (
    <View style={containerStyles}>
      {!noLabel && (
        <View style={LABEL}>
          <Text preset="fieldLabel" text={label} />
        </View>
      )}
      <View style={[inputContainerStyle, inputContainerStyleOverride]}>
        {icon && <Icon style={!(noRTL && I18nManager.isRTL) ? ICON : ICON_NO_RTL} icon={icon} />}
        {extraIcon && extraIcon()}
        {!mask ? (
          <TextInput
            placeholder={actualPlaceholder}
            underlineColorAndroid={color.transparent}
            style={inputStyles}
            {...rest}
            secureTextEntry={rest.secureTextEntry || isPassword}
            ref={forwardedRef}
            placeholderTextColor={color.placeholder}
          />
        ) : (
          <TextInputMask
            {...rest}
            style={inputStyles}
            underlineColorAndroid={color.transparent}
            placeholderTextColor={color.placeholder}
            placeholder={actualPlaceholder}
            onChangeText={(formatted, extracted) => {
              rest.onChangeText(extracted) // 1234567890
            }}
            mask={mask}
          />
        )}
        {withCurrency && (
          <Text preset="bold" style={CURRENCY}>
            KWD
          </Text>
        )}
        {withToggleSecure && <Icon style={ICON_EYE} icon={eyeIcon} onPress={changePwdType} />}
      </View>
      {error && <Text preset="error">{error.message}</Text>}
      {maxLength && (
        <Text preset="placeholder" style={currentLength > maxLength ? [COUNT, ERROR] : COUNT}>
          {currentLength}/{maxLength}
        </Text>
      )}
    </View>
  )
}
