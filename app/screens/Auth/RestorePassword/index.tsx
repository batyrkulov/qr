import { useNavigation } from "@react-navigation/native"
import React from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { getRestorePasswordCode } from "../../../api/auth"
import { AuthLayout, GradientButton, PhoneInput, Text } from "../../../components"
import { AuthStack, CodeTypes } from "../../../navigators/constans"
import { setAuthError } from "../../../store/ducks/auth/actions"
import { RootState } from "../../../store/rootReducer"
import { INPUT } from "./styles"

export const RestorePasswordScreen = () => {
  const { t } = useTranslation()
  const codes = useSelector((state: RootState) => state.auth.phoneCodes)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_code_id: codes[0]?.id,
    },
  })
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    getRestorePasswordCode(data)
      .then((res) => {
        navigation.navigate(AuthStack.enterCode, {
          type: CodeTypes.restore,
          data,
          email: res?.data?.email,
        })
      })
      .catch((err) => {
        dispatch(setAuthError(err?.response?.data?.message || err))
      })
  }

  return (
    <AuthLayout fixedScreen title={t("auth.restorePassword.title")}>
      <View>
        <PhoneInput control={control} containerStyle={INPUT} />
        {!!Object.values(errors).length && (
          <Text preset="error">{Object.values(errors)[0].message}</Text>
        )}
        <GradientButton onPress={handleSubmit(onSubmit)} text={t("auth.restorePassword.button")} />
      </View>
    </AuthLayout>
  )
}
