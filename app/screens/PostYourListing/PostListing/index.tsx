import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { MARGIN_BOTTOM } from "../../../common_styles"
import { Body, Footer, Icon, Input, Screen, Selector, Text } from "../../../components"
import { GradientButton } from "../../../components/gradient-button"
import { TEXTAREA } from "../../../components/report-modal/styles"
import { PostStack } from "../../../navigators/constans"
import { PrimaryParamList } from "../../../navigators/post-stack"
import { clearChosenCategories } from "../../../store/ducks/category/actions"
import { selectChosenCategory } from "../../../store/ducks/category/selectors"
import { clearLocations } from "../../../store/ducks/location/actions"
import { clearPostData, setPostOption } from "../../../store/ducks/newPost/actions"
import { selectUser } from "../../../store/ducks/profile/selectors"
import { IUser } from "../../../store/ducks/profile/types"
import { color } from "../../../theme"
import { TEXT } from "../../AddPost/styles"
import { INPUT } from "../../Auth/Login/styles"
import { BTN } from "../../FillProfile/styles"
import { HEADER, ICON } from "./styles"

type PostListingScreenRouteProp = RouteProp<PrimaryParamList, PostStack.postListing>

export const PostListingScreen = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { params } = useRoute<PostListingScreenRouteProp>()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const goToCategories = () => {
    // dispatch(clearChosenCategories())
    navigation.dispatch(StackActions.push(PostStack.categories))
  }
  const user: IUser = useSelector(selectUser)

  const handleNext = (data) => {
    dispatch(setPostOption({ option: "title", value: data.title }))
    dispatch(setPostOption({ option: "description", value: data.description }))
    dispatch(setPostOption({ option: "price", value: data.price }))
    dispatch(setPostOption({ option: "client_phone_number", value: data.client_phone_number }))
    navigation.navigate(PostStack.location)
  }
  const chosenCategory = useSelector(selectChosenCategory)

  useEffect(() => {
    register("categories", { required: { value: true, message: "This feild is mandatory **" } })
  }, [register])

  useEffect(() => {
    if (chosenCategory) {
      setValue("categories", chosenCategory, { shouldValidate: true })
    }
  }, [chosenCategory, setValue])

  const onExit = () => {
    dispatch(clearPostData())
    dispatch(clearChosenCategories())
    dispatch(clearLocations())
    navigation.navigate(PostStack.addPost)
  }

  return (
    <Screen backgroundColor={color.background} preset="scroll">
      <Body withBackGroundImage>
        <View style={HEADER}>
          <Text style={TEXT} preset="header">
            {params?.isTrading ? t("trading.title") : t("postYourListing.title")}
          </Text>
          <Icon onPress={onExit} style={ICON} icon="close" />
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
          render={({ field: { onChange } }) => (
            <Input
              error={errors.description}
              onChangeText={onChange}
              style={MARGIN_BOTTOM(16)}
              inputContainerStyle={params?.isTrading ? TEXTAREA : {}}
              label={t("textFields.description")}
              placeholder={t("textFields.descriptionPlaceholder")}
              multiline
            />
          )}
        />
        {!params?.isTrading && (
          <Controller
            control={control}
            name="price"
            rules={{
              required: { value: true, message: "This feild is mandatory **" },
              maxLength: { value: 7, message: "Max value is 9999999" },
            }}
            render={({ field: { onChange } }) => (
              <Input
                withCurrency
                error={errors.price}
                keyboardType="decimal-pad"
                onChangeText={onChange}
                style={INPUT}
                label={t("textFields.price")}
                placeholder={t("textFields.pricePlaceholder")}
              />
            )}
          />
        )}
        {user.can_add_phone_number && (
          <Controller
            control={control}
            name="client_phone_number"
            rules={{
              minLength: { value: 6, message: "Minimun length is 6 digit" },
            }}
            render={({ field: { onChange } }) => (
              <Input
                error={errors.client_phone_number}
                onChangeText={onChange}
                style={MARGIN_BOTTOM(16)}
                inputContainerStyle={params?.isTrading ? TEXTAREA : {}}
                label={t("textFields.phoneNumber")}
                placeholder={t("textFields.phoneNumberPlaceholder")}
                multiline
                keyboardType='phone-pad'
              />
            )}
          />
        )}
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
