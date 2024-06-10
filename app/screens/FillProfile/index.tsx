import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, Modal, ScrollView, TouchableOpacity, View } from "react-native"
import { Asset } from "react-native-image-picker"
import { useToast } from "react-native-toast-notifications"
import { useDispatch, useSelector } from "react-redux"

import { fetchAreas, fetchCountries, fetchDistricts } from "../../api/locations"
import { editProfileData, removeMe, setProfileData, uploadAvatar } from "../../api/profile"
import { MARGIN_BOTTOM } from "../../common_styles"
import {
  Body,
  Footer,
  GradientButton,
  Header,
  Input,
  PhoneFields,
  PhotoUploader,
  Picker,
  RadioOption,
  Screen,
  Text,
  UncontrolledPhoneInput,
} from "../../components"
import { PrimaryParamList } from "../../navigators/app-navigator"
import { AppStack } from "../../navigators/constans"
import { logout } from "../../store/ducks/auth/actions"
import { getPhoneCodes } from "../../store/ducks/auth/thunks"
import { selectUser } from "../../store/ducks/profile/selectors"
import { getUser } from "../../store/ducks/profile/thunks"
import { Patterns } from "../../utils/validate"
import {
  BLUE_TEXT,
  BTN,
  CHANGE_BTN,
  CHANGE_PASS_BTN,
  DELETE_ACC_TEXT,
  DELETE_BTN,
  DIVIDER,
  HORIZONTAL_LINE,
  LOADER,
  MODAL,
  MODAL_BTN_TEXT,
  MODAL_CONTENT,
  MODAL_CONTROLS,
  PHOTO_ERROR,
  SCROLL_CONTAINER,
} from "./styles"

type FillProfileFields = {
  full_name: string
  email: string
  country: string
  district: string
  area_id: string
  avatar_key: string
} & PhoneFields

type FillProfileScreenRouteProp = RouteProp<PrimaryParamList, AppStack.profile>

export const FillProfileScreen = () => {
  const { params } = useRoute<FillProfileScreenRouteProp>()
  const { t } = useTranslation()
  const toast = useToast()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [countries, setCountries] = useState<RadioOption[]>()
  const [districs, setDistrics] = useState<RadioOption[]>()
  const [areas, setAreas] = useState<RadioOption[]>()
  const [activeCountry, setActiveCountry] = useState<RadioOption>()
  const [activeDistrict, setActiveDistrict] = useState<RadioOption>()
  const [activeArea, setActiveArea] = useState<RadioOption>()
  const [avatar, setAvatar] = useState(user?.avatar?.url)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [loadingImage, setLoadingImage] = useState(false)
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm<FillProfileFields>({
    defaultValues: {
      phone: user?.phone,
      phone_code_id: user?.phone_code_id,
      full_name: user?.full_name,
      country: user?.country?.id,
      district: user?.district?.id,
      area_id: user?.area?.id,
      email: user?.email,
      avatar_key: user?.avatar?.key,
    },
  })

  useEffect(() => {
    if (user?.country) {
      setActiveCountry(
        user?.country ? { label: user?.country?.name, value: user?.country.id } : null,
      )
    }
  }, [user])

  useEffect(() => {
    fetchCountries().then(({ data }) =>
      setCountries(data.map((c) => ({ label: c.name, value: c.id }))),
    )
  }, [])
  useEffect(() => {
    const currentDistrict = user?.district?.id
      ? { label: user.district.name, value: user.district.id }
      : null
    setActiveDistrict(currentDistrict)
    setValue("district", currentDistrict?.value || null)
    if (activeCountry) {
      fetchDistricts(activeCountry.value).then(({ data }) =>
        setDistrics(data.map((c) => ({ label: c.name, value: c.id }))),
      )
    }
  }, [activeCountry, setValue, user?.district?.id, user?.district?.name])
  useEffect(() => {
    if (activeDistrict) {
      fetchAreas(activeDistrict.value).then(({ data }) =>
        setAreas(data.map((c) => ({ label: c.name, value: c.id }))),
      )
    }
  }, [activeDistrict])

  useEffect(() => {
    const currentArea = user?.area?.id ? { label: user.area.name, value: user.area.id } : null
    setActiveArea(currentArea)
    setValue("area_id", currentArea?.value || null)
  }, [setValue, user?.area?.id, user?.area?.name])

  const navigation = useNavigation()

  useEffect(() => {
    register("avatar_key")
  }, [register])

  useEffect(() => {
    if (params?.isEdit) {
      dispatch(getPhoneCodes())
    }
  }, [dispatch, params?.isEdit])

  const onSubmit = (data: FillProfileFields) => {
    setProfileData(data)
      .then(() => dispatch(getUser()))
      .then(() => navigation.dispatch(StackActions.replace(AppStack.bottomTabStack)))
      .catch((err) => {
        toast.show(err.response?.data?.message || err)
      })
  }

  const onEdit = (data: FillProfileFields) => {
    editProfileData(data)
      .then(() => dispatch(getUser()))
      .then(() => navigation.navigate(AppStack.bottomTabStack))
      .catch((err) => {
        toast.show(err.response?.data?.message || err)
      })
  }

  const upload = (asset: Asset) => {
    setLoadingImage(true)
    uploadAvatar(asset)
      .then(({ data }) => {
        setPhotoError(null)
        setValue("avatar_key", data.avatar_key, { shouldValidate: true })
        setAvatar(asset.uri)
      })
      .catch((err) => console.log(err.response?.data?.message))
      .finally(() => setLoadingImage(false))
  }
  const openChangePassword = useCallback(() => {
    navigation.navigate(AppStack.changePasswordScreen)
  }, [navigation])

  const openChangePhone = useCallback(() => {
    navigation.navigate(AppStack.changeContactInfo)
  }, [navigation])

  const deleteAvatar = useCallback(() => {
    setAvatar(null)
    setValue("avatar_key", null, { shouldValidate: true })
  }, [setValue])

  const removeAccount = () => {
    removeMe()
      .then(() => dispatch(logout()))
      .catch(console.log)
      .finally(() => setIsDeleteModalActive(false))
  }

  return (
    <>
      <Screen preset="fixed">
        <Header
          {...(params?.isEdit ? { leftIcon: "back" } : {})}
          title={t(params?.isEdit ? "editProfile.editProfile" : "fillProfile.title")}
          onLeftPress={navigation.goBack}
        />
        <Body withBackGroundImage>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SCROLL_CONTAINER}>
            {!loadingImage ? (
              <PhotoUploader
                value={avatar}
                onChange={upload}
                isEdit={params?.isEdit}
                deleteAvatar={deleteAvatar}
              />
            ) : (
              <ActivityIndicator style={LOADER} size="large" />
            )}
            {(!!photoError || errors.avatar_key) && (
              <Text style={PHOTO_ERROR} preset="error">
                {photoError || errors.avatar_key.message}
              </Text>
            )}
            <Controller
              name="full_name"
              control={control}
              rules={{
                required: { message: "This feild is mandatory **", value: true },
                minLength: { message: "At least 2 symbols", value: 2 },
                maxLength: { message: "Maximum 50 symbols", value: 50 },
                pattern: {
                  message: "Symbols and numbers are not allowed",
                  value: Patterns.onlyLetters,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.full_name}
                  value={value}
                  style={MARGIN_BOTTOM(8)}
                  onChangeText={onChange}
                  label={t("textFields.nameAndSurname")}
                  placeholder={t("textFields.nameAndSurnamePlaceholder")}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: { message: "This feild is mandatory **", value: true },
                pattern: { message: "Email is not valid", value: Patterns.email },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.email}
                  autoCapitalize="none"
                  value={value}
                  keyboardType="email-address"
                  style={MARGIN_BOTTOM(8)}
                  onChangeText={onChange}
                  label={t("textFields.email")}
                  placeholder={t("textFields.emailPlaceholder")}
                  editable={false}
                />
              )}
            />
            <UncontrolledPhoneInput code={user?.phone_code.code} value={user?.phone} />
            {params?.isEdit && (
              <>
                <GradientButton
                  onPress={openChangePhone}
                  gradientStyles={CHANGE_BTN}
                  text={t("editProfile.changeContactInfo")}
                />
                <View style={DIVIDER} />
                <TouchableOpacity style={CHANGE_PASS_BTN} onPress={openChangePassword}>
                  <Text text={t("editProfile.changePassword")} style={BLUE_TEXT} />
                </TouchableOpacity>
              </>
            )}
            <View style={HORIZONTAL_LINE} />
            <Controller
              name="country"
              control={control}
              rules={{
                required: { message: "This feild is mandatory **", value: true },
              }}
              render={({ field: { onChange } }) => (
                <Picker
                  error={errors.country}
                  containerStyle={MARGIN_BOTTOM(8)}
                  modalTitle={t("textFields.country")}
                  preselected={activeCountry?.value || null}
                  label={t("textFields.country")}
                  placeholder={t("textFields.countryPlaceholder")}
                  onChange={(v) => {
                    setActiveCountry(v)
                    setActiveDistrict(null)
                    onChange(v.value)
                  }}
                  value={activeCountry?.label}
                  items={countries}
                />
              )}
            />
            <Controller
              name="district"
              control={control}
              rules={{
                required: { message: "This feild is mandatory **", value: true },
              }}
              render={({ field: { onChange } }) => (
                <Picker
                  error={errors.district}
                  containerStyle={MARGIN_BOTTOM(8)}
                  modalTitle={t("textFields.district")}
                  label={t("textFields.district")}
                  preselected={activeDistrict?.value || null}
                  placeholder={t("textFields.districtPlaceholder")}
                  onChange={(v) => {
                    onChange(v.value)
                    setActiveArea(null)
                    setValue("area_id", null)
                    setActiveDistrict(v)
                  }}
                  value={activeDistrict?.label}
                  disabled={!activeCountry}
                  items={districs}
                />
              )}
            />
            <Controller
              name="area_id"
              control={control}
              rules={{
                required: { message: "This feild is mandatory **", value: true },
              }}
              render={({ field: { onChange } }) => (
                <Picker
                  error={errors.area_id}
                  modalTitle={t("textFields.area")}
                  label={t("textFields.area")}
                  preselected={activeArea?.value || null}
                  placeholder={t("textFields.areaPlaceholder")}
                  onChange={(v) => {
                    onChange(v.value)
                    setActiveArea(v)
                  }}
                  value={activeArea?.label}
                  disabled={!activeDistrict}
                  items={areas}
                />
              )}
            />
            {params?.isEdit && (
              <TouchableOpacity onPress={() => setIsDeleteModalActive(true)} style={DELETE_BTN}>
                <Text text={t("editProfile.deleteAcc")} style={DELETE_ACC_TEXT} />
              </TouchableOpacity>
            )}
          </ScrollView>
        </Body>
        <Footer>
          <GradientButton
            onPress={handleSubmit(params?.isEdit ? onEdit : onSubmit)}
            style={BTN}
            text={t("fillProfile.button")}
          />
        </Footer>
      </Screen>
      <Modal visible={isDeleteModalActive} transparent>
        <View style={MODAL}>
          <View style={MODAL_CONTENT}>
            <Text preset="header2">Are you sure?</Text>
            <View style={MODAL_CONTROLS}>
              <TouchableOpacity onPress={removeAccount}>
                <Text style={MODAL_BTN_TEXT} preset="error">
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsDeleteModalActive(false)}>
                <Text style={MODAL_BTN_TEXT}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
