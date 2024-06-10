import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import {
  AuthLayout,
  Button,
  GradientButton,
  Input,
  PhoneFields,
  PhoneInput,
} from "../../../components"
import { AuthStack, MainStack } from "../../../navigators/constans"
import { loginUser } from "../../../store/ducks/auth/thunks"
import { testAction } from "../../../store/ducks/example/reducer"
import { RootState } from "../../../store/rootReducer"
import { Patterns } from "../../../utils/validate"
import { FOOTER, INPUT, LOGIN_BTN } from "./styles"

type LoginFields = {
  phone: string
  password: string
} & PhoneFields

export const LoginScreen = () => {
  const { t } = useTranslation()
  const codes = useSelector((state: RootState) => state.auth.phoneCodes)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    defaultValues: {
      phone_code_id: codes[0]?.id,
    },
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(testAction())
  }, [dispatch])

  const navigation = useNavigation()

  const goHome = () => {
    navigation.navigate(MainStack.appStack)
  }
  const goToRestorePassword = () => {
    navigation.navigate(AuthStack.restorePassword)
  }
  const goToSignUp = () => {
    navigation.navigate(AuthStack.signUp)
  }

  const onSubmit = (data: LoginFields) => {
    dispatch(loginUser({ ...data, phone_code_id: codes[0]?.id }))
  }

  return (
    <AuthLayout handleBack={goHome} logoLabel={t("auth.login.info")} title={t("auth.login.title")}>
      <View>
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
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              style={INPUT}
              label={t("textFields.password")}
              placeholder={t("textFields.passwordPlaceholder")}
              withToggleSecure={true}
              error={errors.password}
            />
          )}
        />

        <GradientButton
          style={LOGIN_BTN}
          onPress={handleSubmit(onSubmit)}
          text={t("auth.login.title")}
        />
        <View style={FOOTER}>
          <Button
            onPress={goToRestorePassword}
            preset="link"
            text={t("auth.login.forgotPassword")}
          />
          <Button preset="link" onPress={goToSignUp} text={t("auth.login.createAccount")} />
        </View>
      </View>
    </AuthLayout>
  )
}
