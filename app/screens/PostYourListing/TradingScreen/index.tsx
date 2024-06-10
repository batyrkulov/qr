import { useNavigation } from "@react-navigation/core"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { I18nManager, ScrollView, TextInput, View } from "react-native"
import { useDispatch } from "react-redux"

import { MARGIN_BOTTOM } from "../../../common_styles"
import {
  Body,
  Footer,
  GradientButton,
  Icon,
  Input,
  Notice,
  Screen,
  SelectButtonGroup,
  Text,
} from "../../../components"
import { TEXTAREA } from "../../../components/report-modal/styles"
import { PostStack } from "../../../navigators/constans"
import { clearTradingData, setTradingOption } from "../../../store/ducks/newTrading/actions"
import { INewTrading } from "../../../store/ducks/newTrading/types"
import { color } from "../../../theme"
import { TEXT } from "../../AddPost/styles"
import { HEADER, ICON } from "../PostListing/styles"

const tradeTypes = [
  { value: 1, label: "Price Quote" },
  { value: 2, label: "Trade In" },
]

const contactOptions = [
  {
    value: 1,
    label: "Phone",
  },
  {
    value: 2,
    label: "SMS",
  },
  {
    value: 3,
    label: "WhatsApp",
  },
  {
    value: 4,
    label: "E-Mail",
  },
]

export const TradingScreen = () => {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 1,
      title: "",
      description: "",
      brand_model: "",
      contact_options: null,
    },
  })
  const navigation = useNavigation()
  const { t } = useTranslation()

  const onExit = () => {
    dispatch(clearTradingData())
    navigation.navigate(PostStack.addPost)
  }

  const onNext = (data) => {
    for (const key in data) {
      dispatch(setTradingOption({ option: key as keyof INewTrading, value: data[key] }))
      navigation.navigate(PostStack.media, { isTrading: true })
    }
  }

  return (
    <Screen>
      <Body withBackGroundImage>
        <View style={HEADER}>
          <Text style={TEXT} preset="header">
            {t("trading.title")}
          </Text>
          <Icon onPress={onExit} style={ICON} icon="close" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Notice styles={MARGIN_BOTTOM(12)}>
            <Text preset="input">{t("trading.notice")}</Text>
          </Notice>
          <View style={MARGIN_BOTTOM(8)}>
            <Controller
              control={control}
              name="type"
              rules={{
                required: {
                  value: true,
                  message: "This feild is mandatory **",
                },
              }}
              render={({ field: { onChange, value }, formState: { errors } }) => (
                <SelectButtonGroup
                  error={errors.type?.message}
                  value={value}
                  onChange={onChange}
                  title={t("trading.tradeType")}
                  options={tradeTypes}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="brand_model"
            rules={{
              required: { value: true, message: "This feild is mandatory **" },
              maxLength: { value: 25, message: "Title cannot be more than 25 chars" },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value as string}
                error={errors.brand_model}
                onChangeText={onChange}
                style={MARGIN_BOTTOM(16)}
                label={t("textFields.brands")}
                placeholder={t("textFields.brandsPlaceholder")}
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            rules={{
              required: { value: true, message: "This feild is mandatory **" },
              maxLength: { value: 25, message: "Title cannot be more than 25 chars" },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.title}
                value={value as string}
                onChangeText={onChange}
                style={MARGIN_BOTTOM(16)}
                label={t("textFields.title")}
                placeholder={t("textFields.titlePlaceholder")}
              />
            )}
          />
          <Text style={MARGIN_BOTTOM(4)} preset="secondary">
            {t("textFields.description")}
          </Text>
          <Controller
            control={control}
            name="description"
            rules={{
              required: { value: true, message: "This feild is mandatory **" },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={MARGIN_BOTTOM(16)}>
                <TextInput
                  multiline
                  numberOfLines={10}
                  placeholder={t("textFields.descriptionPlaceholder")}
                  style={TEXTAREA}
                  onChangeText={onChange}
                  value={value as string}
                  placeholderTextColor={color.placeholder}
                />
                {!!errors.description && <Text preset="error"> {errors.description.message}</Text>}
              </View>
            )}
          />
          <Controller
            control={control}
            name="contact_options"
            rules={{
              required: {
                value: true,
                message: "This feild is mandatory **",
              },
            }}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <SelectButtonGroup
                value={(value as (string | number)[]) || []}
                error={errors.contact_options?.message}
                onChange={onChange}
                title={t("trading.contact")}
                subtitle={!I18nManager.isRTL && " Choose methods to contact you*"}
                options={contactOptions}
                multiple
              />
            )}
          />
        </ScrollView>
      </Body>

      <Footer>
        <GradientButton onPress={handleSubmit(onNext)} text={t("common.nextStep")} />
      </Footer>
    </Screen>
  )
}
