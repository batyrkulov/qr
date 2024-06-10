import { useNavigation } from "@react-navigation/native"
import React, { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useToast } from "react-native-toast-notifications"

import { changePassword, ChangePasswordReq } from "../../../api/profile"
import { MARGIN_BOTTOM } from "../../../common_styles"
import { Body, Footer, GradientButton, Header, Input, Screen, Text } from "../../../components"
import { Patterns } from "../../../utils/validate"

type ChangePassType = {
  repeat: string
} & ChangePasswordReq

const Component = (): React.ReactElement => {
  const { t } = useTranslation()
  const toast = useToast()
  const { goBack } = useNavigation()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePassType>()

  const password = watch("new_password")

  const onSubmit = useCallback(
    (data) => {
      const changePasswordData = { ...data }
      delete changePasswordData.repeat
      changePassword(data)
        .then(() => goBack())
        .catch((err) => toast.show(err.response?.data?.message || err))
    },
    [goBack, toast],
  )

  return (
    <Screen preset="fixed">
      <Header leftIcon={"back"} title={t("editProfile.changePassword")} onLeftPress={goBack} />
      <Body withBackGroundImage>
        <Controller
          name="old_password"
          control={control}
          rules={{
            required: { message: "Current password is required", value: true },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              autoCapitalize="none"
              value={value}
              style={MARGIN_BOTTOM(16)}
              onChangeText={onChange}
              label={t("editProfile.currentPass")}
              placeholder={t("editProfile.enterCurrentPass")}
            />
          )}
        />

        <Controller
          name="new_password"
          control={control}
          rules={{
            required: { value: true, message: "Password cannot be empty" },
            minLength: { value: 6, message: "Password must be not less than 6 chars" },

            pattern: {
              value: Patterns.password,
              message:
                "Password must contain at minimum 1 uppercase char and 1 lowercase char and number",
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
          name="repeat"
          control={control}
          rules={{
            required: { value: true, message: "Passwords do not match" },
            validate: (v) => v === password || "Passwords do not match",
          }}
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              style={MARGIN_BOTTOM(16)}
              label={t("textFields.repeatPassword")}
              placeholder={t("textFields.repeatPasswordPlaceholder")}
              withToggleSecure={true}
            />
          )}
        />
        {!!Object.values(errors).length && (
          <Text preset="error">{Object.values(errors)[0].message}</Text>
        )}
      </Body>
      <Footer>
        <GradientButton onPress={handleSubmit(onSubmit)} text={t("fillProfile.button")} />
      </Footer>
    </Screen>
  )
}
export const ChangePassword = React.memo(Component)
