import React, { FC, useState } from "react"
import { FieldError } from "react-hook-form"
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { RadioOption } from "../radio_button"
import { SelectModal } from "../select_modal"
import { Selector } from "../selector"
import { Text } from "../text/text"

export type PickerProps = {
  label?: string
  placeholder?: string
  value: string
  onChange?: (v: RadioOption) => void
  items?: RadioOption[]
  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
  iconStyle?: StyleProp<ImageStyle>
  modalTitle?: string
  textStyle?: TextStyle
  disabled?: boolean
  error?: FieldError
  preselected?: string | number
  modalHeight?: number
}

export const Picker: FC<PickerProps> = ({
  label,
  placeholder,
  containerStyle,
  value,
  onChange = () => null,
  items = [],
  modalTitle,
  inputStyle,
  iconStyle,
  textStyle,
  disabled,
  error,
  preselected,
  modalHeight,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  const closeModal = () => {
    setIsVisible(false)
  }

  const openModal = () => {
    setIsVisible(true)
  }

  const onApply = (v: RadioOption) => {
    if (v) {
      onChange(v)
    }
    closeModal()
  }

  return (
    <View style={containerStyle}>
      <Selector
        iconStyle={iconStyle}
        inputStyle={inputStyle}
        textStyle={textStyle}
        label={label}
        placeholder={placeholder}
        value={items.find(i => i.value === preselected)?.label || value}
        onPress={openModal}
        isSelect
        disabled={disabled}
      />
      <SelectModal
        title={modalTitle}
        options={items}
        onApply={onApply}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        onDismiss={closeModal}
        isVisible={isVisible}
        preselected={preselected}
        modalHeight={modalHeight}
      />
      {error && <Text preset="error">{error.message}</Text>}
    </View>
  )
}
