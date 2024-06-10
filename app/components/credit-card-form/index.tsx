import React, { FC } from "react"
import { Control, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { I18nManager, View } from "react-native"

import { MARGIN_BOTTOM } from "../../common_styles"
import { Input } from ".."
import { Text } from "../text/text"
import { INPUT, ROW, TOTAL } from "./styles"

export type CreditCardFormFields = {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvc: string
}

type CreditCardFormProps = {
  control: Control<CreditCardFormFields>
}

export const CreditCardForm: FC<CreditCardFormProps> = ({ control }) => {
  const { t } = useTranslation()
  const LAST_INPUT = { ...INPUT, marginLeft: 15 }
  return (
    <View>
      <Controller
        name="cardNumber"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <Input
            onChangeText={onChange}
            label={t("textFields.cardNumber")}
            placeholder={t("textFields.cardNumberPlaceholder")}
            mask="[0000] [0000] [0000] [0000]"
            inputContainerStyle={MARGIN_BOTTOM(10)}
          />
        )}
      />
      <Controller
        name="cardHolder"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <Input
            onChangeText={onChange}
            label={t("textFields.cardHolder")}
            placeholder={t("textFields.cardHolderPlaceholder")}
            inputContainerStyle={MARGIN_BOTTOM(10)}
          />
        )}
      />
      <View style={[ROW, MARGIN_BOTTOM(30)]}>
        <Controller
          name="expiryDate"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <Input
              style={!I18nManager.isRTL ? INPUT : LAST_INPUT}
              label={t("textFields.expDate")}
              placeholder={t("textFields.expDatePlaceholder")}
              onChangeText={onChange}
              mask="[00]/[00]"
            />
          )}
        />
        <Controller
          name="cvc"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <Input
              style={!I18nManager.isRTL ? LAST_INPUT : INPUT}
              label={t("textFields.cvc")}
              placeholder={t("textFields.cvcPlaceholder")}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
      </View>
      <View style={TOTAL}>
        <Text preset="bold">{t("common.total")}</Text>
        <Text preset="bold">3 KD</Text>
      </View>
    </View>
  )
}
