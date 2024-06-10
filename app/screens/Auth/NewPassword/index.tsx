import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch } from "react-redux"

import { restorePassword } from "../../../api/auth"
import { MARGIN_BOTTOM } from "../../../common_styles"
import { AuthLayout, GradientButton, Input, Text } from "../../../components"
import { PrimaryParamList } from "../../../navigators/auth-navigator"
import { AuthStack } from "../../../navigators/constans"
import { setAuthError } from "../../../store/ducks/auth/actions"
import { Patterns } from "../../../utils/validate"

export type NewPasswordFields = {
  password: string
  repeatPassword: string
}

type NewPasswordScreenRouteProp = RouteProp<PrimaryParamList, AuthStack.newPassword>

export const NewPasswordScreen = () => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordFields>()
  const { params } = useRoute<NewPasswordScreenRouteProp>()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const password = watch("password")

  const onSubmit = (data) => {
    delete data.repeatPassword
    restorePassword({ ...params.data, ...data })
      .then(() => {
        navigation.navigate(AuthStack.login)
      })
      .catch((err) => {
        dispatch(setAuthError(err?.response?.data?.message || err))
      })
  }

  return (
    <AuthLayout title={t("auth.newPassword.title")}>
      <View>
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
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              style={MARGIN_BOTTOM(16)}
              label={t("textFields.newPassword")}
              placeholder={t("textFields.newPasswordPlaceholder")}
              withToggleSecure={true}
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
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              style={MARGIN_BOTTOM(16)}
              label={t("textFields.repeatNewPassword")}
              placeholder={t("textFields.repeatNewPasswordPlaceholder")}
              withToggleSecure={true}
            />
          )}
        />
        {!!Object.values(errors).length && (
          <Text preset="error">{Object.values(errors)[0].message}</Text>
        )}
        <GradientButton onPress={handleSubmit(onSubmit)} text={t("auth.newPassword.button")} />
      </View>
    </AuthLayout>
  )
}
