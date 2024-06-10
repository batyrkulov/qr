import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useToast } from "react-native-toast-notifications"

import { checkRestorePasswordCode, getRestorePasswordCode, getSignUpCode } from "../../../api/auth"
import { AuthLayout, Button, GradientButton, Input } from "../../../components"
import { PrimaryParamList } from "../../../navigators/auth-navigator"
import { AuthStack, CodeTypes } from "../../../navigators/constans"
import { useAppDispatch } from "../../../store"
import { setAuthError } from "../../../store/ducks/auth/actions"
import { createUser } from "../../../store/ducks/auth/thunks"
import { BTN_LINK, INPUT } from "./styles"

type EnterCodeScreenRouteProp = RouteProp<PrimaryParamList, AuthStack.enterCode>

export const EnterCodeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>()
  const { params } = useRoute<EnterCodeScreenRouteProp>()
  const resend = () => {
    switch (params.type) {
      case CodeTypes.signUp:
        getSignUpCode({ ...params.data, password: params.data.password ?? "" }).catch((err) => {
          dispatch(setAuthError(err?.response?.data?.message || err))
        })
        break
      case CodeTypes.restore:
        getRestorePasswordCode(params.data)
          .then(() => toast.show("Code has been sent"))
          .catch((err) => {
            dispatch(setAuthError(err?.response?.data?.message || err))
          })
        break
      default:
        break
    }
  }
  const onSubmit = ({ code }) => {
    switch (params.type) {
      case CodeTypes.signUp:
        dispatch(createUser({ password: params.data.password || "", ...params.data, code }))
          .unwrap()
          .catch(console.log)
        break
      case CodeTypes.restore:
        checkRestorePasswordCode({ ...params.data, code })
          .then(() => {
            navigation.navigate(AuthStack.newPassword, { data: { ...params.data, code } })
          })
          .catch((err) => {
            dispatch(setAuthError(err?.response?.data?.message || err))
          })
        break

      default:
        break
    }
  }

  console.log("data", params)
  return (
    <AuthLayout title={t("auth.enterCode.title")}>
      <View>
        <Controller
          name="code"
          control={control}
          rules={{
            required: { value: true, message: "Code cannot be empty" },
            minLength: { value: 6, message: "Code must be 6 chars" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={onChange}
              error={errors.code}
              placeholder={t("textFields.codePlaceholder")}
              label={`${t("textFields.enterCodeFromEmail")}: ${params.email || params.data.email}`}
              style={INPUT}
              maxLength={6}
              value={value}
              keyboardType="numeric"
            />
          )}
        />
        <GradientButton onPress={handleSubmit(onSubmit)} text={t("auth.enterCode.button")} />
        <Button
          style={BTN_LINK}
          preset="link"
          onPress={resend}
          text={t("auth.enterCode.oneMoreTime")}
        />
      </View>
    </AuthLayout>
  )
}
