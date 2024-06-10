import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ViewStyle } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { useSelector } from "react-redux"

import { changeContactInfo, sendChangeContactInfoCode } from "../../../api/profile"
import {
  Body,
  Button,
  Footer,
  GradientButton,
  Header,
  Input,
  Screen,
  PhoneInput,
  UncontrolledPhoneInput,
  Text,
} from "../../../components"
import { useAppDispatch } from "../../../store"
import { getUser } from "../../../store/ducks/profile/thunks"
import { RootState } from "../../../store/rootReducer"
import { BTN_LINK } from "../../Auth/EnterCode/styles"
import { INPUT } from "../../Auth/RestorePassword/styles"
import { Patterns } from "../../../utils/validate"
import { selectUser } from "../../../store/ducks/profile/selectors"
import { color } from "../../../theme"

const BODY_STYLE: ViewStyle = {}

const Component = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { goBack } = useNavigation()
  const [isCodeSend, setIsCodeSend] = useState(true)
  const [oneTimeCode, setOneTimeCode] = useState("")
  const [hiddenEmail, setHiddenEmail] = useState<string>("")
  const submitText = useMemo(() => (isCodeSend ? "Send code" : "Save"), [isCodeSend])
  const codes = useSelector((state: RootState) => state.auth.phoneCodes)
  const user = useSelector(selectUser)

  const defaultCodeId = codes.find((code) => code.code === user?.phone_code.code).id

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      phone_code_id: defaultCodeId,
      email: user?.email,
      phone: user?.phone,
    },
  })

  const onPressBack = useCallback(() => {
    if (isCodeSend) {
      goBack()
    } else {
      setIsCodeSend(true)
      setOneTimeCode("")
    }
  }, [goBack, isCodeSend])

  const onSendCode = (data) => {
    sendChangeContactInfoCode(data)
      .then((res) => {
        setHiddenEmail(res.data.email)
        setIsCodeSend(false)
      })
      .catch((err) => toast.show(err.response?.data?.message || err?.message))
  }
  const submitNewContactInfo = useCallback(
    (data) => {
      changeContactInfo({ ...data, code: Number.parseInt(oneTimeCode) })
        .then(() => {
          dispatch(getUser()).then(goBack)
        })
        .catch((err) => toast.show(err.response?.data?.message || err?.message))
    },
    [dispatch, goBack, oneTimeCode, toast],
  )

  const onSubmit = isCodeSend ? handleSubmit(onSendCode) : handleSubmit(submitNewContactInfo)

  const isEmailAndPhoneSame = () => {
    const currentPhone = getValues("phone")
    const currentEmail = getValues("email")
    return currentPhone !== user?.phone || currentEmail !== user?.email
  }

  const isValidError = () => {
    let isHasValidError = false
    Object.values(errors).forEach((val) => {
      if (val.type === "validate") {
        isHasValidError = true
      }
    })
    return isHasValidError
  }

  return (
    <Screen preset={"fixed"}>
      <Header
        leftIcon={"back"}
        title={t("editProfile.changeContactInfo")}
        onLeftPress={onPressBack}
      />
      <Body withBackGroundImage containerStyles={BODY_STYLE}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { message: "This feild is mandatory **", value: true },
            pattern: { message: "Email is not valid", value: Patterns.email },
            validate: () => isEmailAndPhoneSame(),
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.email}
              autoCapitalize="none"
              value={value}
              keyboardType="email-address"
              onChangeText={onChange}
              label={t("textFields.newEmailLabel")}
              placeholder={t("textFields.emailPlaceholder")}
              editable={isCodeSend}
              style={INPUT}
            />
          )}
        />
        {isCodeSend ? (
          <PhoneInput
            error={errors.phone || errors.phone_code_id}
            label={t("textFields.newPhoneNumberLabel")}
            control={control}
            containerStyle={INPUT}
            defaultCodeId={defaultCodeId}
            additionalRules={{ validate: () => isEmailAndPhoneSame() }}
          />
        ) : (
          <UncontrolledPhoneInput
            value={getValues("phone")}
            code={codes.find((c) => c.id === getValues("phone_code_id")).code}
            label="Enter New Phone"
            containerStyle={INPUT}
          />
        )}
        {isValidError() && (
          <Text
            preset="inputBold"
            style={{ color: color.palette.angry }}
            text={t("editProfile.notSameValidError")}
          />
        )}
        {!isCodeSend && hiddenEmail && (
          <>
            <Input
              onChangeText={setOneTimeCode}
              // error={errors.code}
              placeholder={t("textFields.codePlaceholder")}
              label={`${t("textFields.enterCodeFromEmail")}: ${hiddenEmail}`}
              style={INPUT}
              maxLength={6}
              value={oneTimeCode}
              keyboardType="numeric"
            />
            <Button
              style={BTN_LINK}
              preset="link"
              onPress={handleSubmit(onSendCode)}
              text={t("auth.enterCode.oneMoreTime")}
            />
          </>
        )}
      </Body>
      <Footer>
        <GradientButton onPress={onSubmit} text={submitText} />
      </Footer>
    </Screen>
  )
}
export const ChangeContactInfo = React.memo(Component)
