import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { FC, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { MARGIN_BOTTOM } from "../../common_styles"
import { Body, Footer, GradientButton,Input, Screen, Selector, Text } from "../../components"
import { AppStack, PostStack } from "../../navigators/constans"
import { addSelectedCategory,clearChosenCategories } from "../../store/ducks/category/actions"
import { selectChosenCategory } from "../../store/ducks/category/selectors"
import { setPostOption } from "../../store/ducks/newPost/actions"
import { color } from "../../theme"
import { BTN,HEADER, INPUT, TEXT, TEXTAREA } from "./styles"

export const PostEditScreen: FC = () => {
  const chosenCategory = useSelector(selectChosenCategory)
  const { params: { details } } = useRoute()

  const { t } = useTranslation()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: details?.title,
      description: details?.description,
      price: details?.price,
      client_phone_number: details?.client_phone_number
    },
  })
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {

    details?.tree_category?.forEach(cat => {
      dispatch(addSelectedCategory({
        categoryId: cat.id || 0,
        value: {
          name: cat.category_description[0]?.short_name || "",
          id: cat.id,
        },
      }))
    })

    dispatch(addSelectedCategory({
      categoryId: details?.model?.id || 0,
      value: {
        name: details?.model?.name || "",
        id: details?.model?.id,
      },
    }))

    dispatch(setPostOption({ option: "post_type_id", value: details?.post_type_id }))

    setPostMedia()

  }, [details])

  const setPostMedia = () => {
    const mediaFiles = []
    details?.post_file.forEach((media) => {
      mediaFiles.push({
        name: media?.public_file?.original_name,
        type: media?.public_file?.mime_type,
        uri: media?.public_file?.url,
        file_key: media?.public_file?.key,
        is_primary: media?.is_primary,
        order: media?.order,
      })
    })
    dispatch(
      setPostOption({
        option: "media_files",
        value: mediaFiles,
      }),
    )
  }

  const goToCategories = () => {
    dispatch(clearChosenCategories())
    navigation.dispatch(StackActions.push(PostStack.categories, {selectType: 'PostEdit', details}))
  }

  const handleNext = (data) => {
    dispatch(setPostOption({ option: "title", value: data.title }))
    dispatch(setPostOption({ option: "description", value: data.description }))
    dispatch(setPostOption({ option: "price", value: data.price }))
    dispatch(setPostOption({ option: "client_phone_number", value: data.client_phone_number }))
    navigation.navigate(AppStack.postEditPhoto, {details})
  }

  return (
    <Screen backgroundColor={color.background} preset="scroll">
      <Body withBackGroundImage>
        <View style={HEADER}>
          <Text style={TEXT} preset="header">
            {t("postEdit.title")}
          </Text>
        </View>

        <Selector
          error={errors.categories}
          containerStyle={INPUT}
          label={t("textFields.selling")}
          placeholder={t("textFields.sellingPlaceholder")}
          value={chosenCategory}
          onPress={goToCategories}
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
              maxLength={25}
              value={value}
              error={errors.title}
              onChangeText={onChange}
              style={INPUT}
              label={t("textFields.title")}
              placeholder={t("textFields.titlePlaceholder")}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{
            required: { value: true, message: "This feild is mandatory **" },
            maxLength: { value: 1200, message: "Description cannot be more than 1200 chars" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.description}
              onChangeText={onChange}
              style={MARGIN_BOTTOM(16)}
              inputContainerStyle={TEXTAREA}
              label={t("textFields.description")}
              placeholder={t("textFields.descriptionPlaceholder")}
              multiline
              textAlignVertical="top"
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          rules={{
            required: { value: true, message: "This feild is mandatory **" },
            maxLength: { value: 7, message: "Max value is 9999999" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              withCurrency
              error={errors.price}
              keyboardType="decimal-pad"
              onChangeText={onChange}
              style={INPUT}
              label={t("textFields.price")}
              placeholder={t("textFields.pricePlaceholder")}
              value={value.toString()}
            />
          )}
        />
        <Controller
          control={control}
          name="client_phone_number"
          rules={{
            required: { value: true, message: "This feild is mandatory **" },
            minLength: { value: 6, message: "Minimun length is 6 digit" },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              error={errors.client_phone_number}
              onChangeText={onChange}
              style={MARGIN_BOTTOM(16)}
              inputContainerStyle={{}}
              label={t("textFields.phoneNumber")}
              placeholder={t("textFields.phoneNumberPlaceholder")}
              multiline
              keyboardType="phone-pad"
              value={value}
            />
          )}
        />
      </Body>
      <Footer>
        <GradientButton
          onPress={handleSubmit(handleNext)}
          style={BTN}
          text={t("common.nextStep")}
        />
      </Footer>
    </Screen>
  )
}
