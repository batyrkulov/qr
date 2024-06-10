import React, { FC, useEffect, useState } from "react"
import { Control, Controller, FieldError } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { I18nManager, TextInput, View, ViewStyle } from "react-native"
import { useSelector } from "react-redux"

import { RootState } from "../../store/rootReducer"
import { color } from "../../theme"
import { Picker } from ".."
import { Text } from "../text/text"
import { RTL } from "../text-field/text-field"
import {
  CODE_CONTAINER,
  CODE_INPUT,
  CODE_INPUT_TEXT,
  CONTAINER,
  LABEL,
  NUMBER_INPUT,
  TEXT_CODE,
  TEXT_INPUT,
} from "./styles"

export type PhoneFields = {
  phone: number
  phone_code_id: number
}

type PhoneInputProps = {
  containerStyle?: ViewStyle
  control: Control<PhoneFields & any>
  error?: FieldError
  label?: string
  defaultCodeId?: number
  additionalRules?: any
}

export const PhoneInput: FC<PhoneInputProps> = ({
  containerStyle,
  control,
  error,
  label,
  defaultCodeId,
  additionalRules = {},
}) => {
  const { t } = useTranslation()
  const codes = useSelector((state: RootState) => state.auth.phoneCodes)
  const [selectedCode, setSelectedCode] = useState(codes[0]?.code)

  useEffect(() => {
    if (codes.length && defaultCodeId) {
      const defaultCode = codes?.find((code) => code.id === defaultCodeId).code
      return setSelectedCode(defaultCode)
    }
    if (codes.length) {
      return setSelectedCode(codes[0]?.code)
    }
  }, [codes, defaultCodeId])

  const styles = I18nManager.isRTL ? { ...TEXT_INPUT, ...RTL } : { ...TEXT_INPUT }

  const WRAPPER = { marginBottom: 16, ...containerStyle }

  return (
    <View style={WRAPPER}>
      <View style={LABEL}>
        <Text preset="fieldLabel">{label || t("textFields.phone")}</Text>
      </View>
      <View style={CONTAINER(!!error)}>
        {/* <Controller
          control={control}
          name="phone_code_id"
          rules={{
            required: { message: "Choose phone code", value: true },
          }}
          render={({ field }) => {
            return (
              <Picker
                inputStyle={CODE_INPUT}
                containerStyle={CODE_CONTAINER}
                textStyle={CODE_INPUT_TEXT}
                modalTitle={t("auth.login.selectCode")}
                value={selectedCode}
                preselected={defaultCodeId}
                onChange={(v) => {
                  field.onChange(v.value)
                  setSelectedCode(v?.label || null)
                }}
                items={codes.map((code) => ({ value: code.id, label: code.code }))}
                label=""
                placeholder="+"
                disabled
              />
            )
          }}
        /> */}
        <Text style={TEXT_CODE}>+965</Text>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: { value: true, message: "Phone This feild is mandatory **" },
            minLength: { message: "Phone number is not correct", value: 9 },
            maxLength: { message: "Phone number is not correct", value: 12 },
            ...additionalRules,
          }}
          render={({ field }) => {
            return (
              <TextInput
                placeholder={t("auth.login.selectCode")}
                style={{ ...styles, ...NUMBER_INPUT }}
                value={field.value}
                onChangeText={(v) => field.onChange(+v.replace(/[^0-9]/g, ""))}
                placeholderTextColor={color.placeholder}
                keyboardType="phone-pad"
                maxLength={12}
              />
            )
          }}
        />
      </View>
      {error && <Text preset="error">{error.message}</Text>}
    </View>
  )
}

type UncontrolledPhoneInputProps = {
  value: string | number
  code: string
  containerStyle?: ViewStyle
  label?: string
}

export const UncontrolledPhoneInput: FC<UncontrolledPhoneInputProps> = ({
  value,
  code,
  containerStyle,
  label,
}) => {
  const { t } = useTranslation()

  const WRAPPER = { marginBottom: 16, ...containerStyle }
  const styles = I18nManager.isRTL ? { ...TEXT_INPUT, ...RTL } : { ...TEXT_INPUT }

  return (
    <View style={WRAPPER}>
      <View style={LABEL}>
        <Text preset="fieldLabel">{label || t("textFields.phone")}</Text>
      </View>
      <View style={CONTAINER(false)}>
        <Picker
          inputStyle={CODE_INPUT}
          containerStyle={CODE_CONTAINER}
          textStyle={CODE_INPUT_TEXT}
          value={code}
          label=""
          disabled
        />
        <TextInput
          editable={false}
          placeholder={t("textFields.phonePlaceholder")}
          style={{ ...styles, ...NUMBER_INPUT }}
          value={value?.toString()}
          maxLength={13}
        />
      </View>
    </View>
  )
}
