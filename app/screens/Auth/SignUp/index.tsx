import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { getSignUpCode } from "../../../api/auth"
import {
  AuthLayout,
  Button,
  GradientButton,
  Input,
  PhoneFields,
  PhoneInput,
} from "../../../components"
import { AuthStack, CodeTypes } from "../../../navigators/constans"
import { setAuthError } from "../../../store/ducks/auth/actions"
import { RootState } from "../../../store/rootReducer"
import { Patterns } from "../../../utils/validate"
import { BTN_LINK, INPUT } from "./styles"

type SignUpFields = {
  email: string
  password: string
  repeatPassword: string
} & PhoneFields

export const SignUpScreen = () => {
  const { t } = useTranslation()
  const codes = useSelector((state: RootState) => state.auth.phoneCodes)
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFields>({
    defaultValues: {
      phone_code_id: codes[0]?.id,
    },
  })
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const goToLogin = () => {
    navigation.navigate(AuthStack.login)
  }
  const onSubmit = (data: SignUpFields) => {
    delete data.repeatPassword
    getSignUpCode(data)
      .then(() => {
        navigation.navigate(AuthStack.enterCode, { type: CodeTypes.signUp, data })
      })
      .catch((err) => {
        dispatch(setAuthError(err?.response?.data?.message || err))
      })
  }

  const password = watch("password")

  return (
    <AuthLayout logoLabel={t("auth.signUp.info")}>
      <View>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: "Email cannot be empty" },
            pattern: {
              value: Patterns.email,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              maxLength={32}
              value={value}
              onChangeText={onChange}
              style={INPUT}
              label={t("textFields.email")}
              placeholder={t("textFields.emailPlaceholder")}
              error={errors.email}
            />
          )}
        />
        <PhoneInput
          error={errors.phone || errors.phone_code_id}
          control={control}
          containerStyle={INPUT}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "Password cannot be empty" },
            minLength: { value: 6, message: "Password must be not less than 6 chars" },

            pattern: {
              value: Patterns.password,
              message:
                "At least 1 capital letter* , 1 special symbol* , 1 number* , 1 lowercase letter*",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              maxLength={32}
              value={value}
              onChangeText={onChange}
              style={INPUT}
              label={t("textFields.password")}
              placeholder={t("textFields.passwordPlaceholder")}
              withToggleSecure={true}
              error={errors.password}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: { value: true, message: "Passwords do not match" },
            validate: (v) => v === password || "Passwords do not match",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              maxLength={32}
              value={value}
              onChangeText={onChange}
              style={INPUT}
              label={t("textFields.repeatPassword")}
              placeholder={t("textFields.repeatPasswordPlaceholder")}
              withToggleSecure={true}
              error={errors.repeatPassword}
            />
          )}
        />

        <GradientButton onPress={handleSubmit(onSubmit)} text={t("auth.signUp.button")} />
        <Button style={BTN_LINK} onPress={goToLogin} preset="link" text={t("auth.signUp.link")} />
      </View>
    </AuthLayout>
  )
}