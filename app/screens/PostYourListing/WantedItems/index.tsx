import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useEffect, useMemo, useState } from "react"
import { FieldError } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { fetchAreas, fetchDistricts } from "../../../api/locations"
import { MARGIN_BOTTOM } from "../../../common_styles"
import {
  Body,
  Footer,
  GradientButton,
  Icon,
  Input,
  MediaInput,
  Notice,
  Picker,
  RadioOption,
  Screen,
  Selector,
  Text,
} from "../../../components"
import { PostStack } from "../../../navigators/constans"
import { clearChosenCategories } from "../../../store/ducks/category/actions"
import { selectChosenCategory, selectLastCategory } from "../../../store/ducks/category/selectors"
import { setSelectedArea, setSelectedDistrict } from "../../../store/ducks/location/actions"
import { selectSelectedArea, selectSelectedDistrict } from "../../../store/ducks/location/selectors"
import { selectIsShowPayment } from "../../../store/ducks/meta/selectors"
import { clearPostData, setPostOption } from "../../../store/ducks/newPost/actions"
import { IMedia } from "../../../store/ducks/newPost/types"
import { RootState } from "../../../store/rootReducer"
import { TEXT } from "../../AddPost/styles"
import { BODY } from "../AddMedia/styles"
import { HEADER, ICON } from "../PostListing/styles"
import { MEDIA } from "./styles"

type FormErrors = {
  media?: FieldError | null
  model?: FieldError | null
  title?: FieldError | null
  description?: FieldError | null
  area?: FieldError | null
}

export const WantedItemsScreen = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const selectedImages = useSelector((state: RootState) => state.newPost.post.media_files)
  const [images, setImages] = useState<IMedia[]>(selectedImages)
  const [areas, setAreas] = useState([])
  const [districs, setDistrics] = useState([])
  const [errors, setErrors] = useState<FormErrors>({})
  const isShowPayment = useSelector(selectIsShowPayment)
  const title = useSelector((state: RootState) => state.newPost.post.title)
  const description = useSelector((state: RootState) => state.newPost.post.description)
  const selectedCategory = useSelector(selectLastCategory)

  const onChange = (images: IMedia[]) => {
    const media = images
    setImages(media)
    setErrors({ ...errors, media: null })
    dispatch(
      setPostOption({
        option: "media_files",
        value: media,
      }),
    )
  }
  const onChangeTitle = (value: string) => {
    dispatch(setPostOption({ option: "title", value }))
  }
  const onExit = () => {
    dispatch(clearPostData())
    navigation.navigate(PostStack.addPost)
  }
  const onChangeDescription = (value: string) => {
    dispatch(setPostOption({ option: "description", value }))
  }

  const goToCategories = () => {
    dispatch(clearChosenCategories())
    navigation.dispatch(StackActions.push(PostStack.categories))
  }

  useEffect(() => {
    fetchDistricts(1).then(({ data }) => {
      setDistrics(data.map((d) => ({ label: d.name, value: d.id })))
    })
  }, [])

  const selectedDistrict = useSelector(selectSelectedDistrict)

  const selectedArea = useSelector(selectSelectedArea)

  const setDistrict = (distric: RadioOption) => {
    dispatch(setSelectedDistrict(distric?.label || null))
    fetchAreas(distric.value).then(({ data }) => {
      setAreas(data.map((a) => ({ label: a.name, value: a.id })))
    })
    setArea(null)
  }
  const setArea = (area: RadioOption) => {
    dispatch(setPostOption({ option: "area_id", value: area?.value || null }))
    dispatch(setSelectedArea(area?.label || null))
  }
  const chosenCategory = useSelector(selectChosenCategory)
  const hasPrimary = useMemo(() => !!images.filter((img) => img.is_primary).length, [images])
  const validate = () => {
    setErrors({
      media: !hasPrimary ? { type: "required", message: "Add a primary image " } : null,
      model: !chosenCategory ? { type: "required", message: "This feild is mandatory **" } : null,
      area: !selectedArea ? { type: "required", message: "This feild is mandatory **" } : null,
      title: !title
        ? { type: "required", message: "This feild is mandatory **" }
        : title.length > 25
        ? { type: "maxLength", message: "Title must be not more than 25 symbols" }
        : null,
      description: !description
        ? { type: "required", message: "This feild is mandatory **" }
        : null,
    })

    return (
      !!hasPrimary &&
      !!chosenCategory &&
      !!selectedArea &&
      !!title &&
      !!description &&
      title.length <= 25
    )
  }

  useEffect(() => {
    dispatch(setPostOption({ option: "payment_plan_id", value: isShowPayment ? 5 : 7 }))
  }, [dispatch, isShowPayment])

  const onSubmit = () => {
    const isValid = validate()
    if (isValid) {
      if (selectedCategory?.id === 111 || selectedCategory?.id === 112) {
        navigation.navigate(PostStack.plan)
      } else {
        navigation.navigate(PostStack.extraInfo, { isWanted: true })
      }
    }
  }

  return (
    <Screen>
      <Body containerStyles={BODY} withBackGroundImage>
        <View style={HEADER}>
          <Text style={TEXT} preset="header">
            {t("wantedItems.title")}
          </Text>
          <Icon onPress={onExit} style={ICON} icon="close" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Notice>
            <Text preset="input">{t("notices.wantedItems")}</Text>
          </Notice>
          <Selector
            error={errors.model}
            label={t("textFields.selling")}
            placeholder={t("textFields.sellingPlaceholder")}
            value={chosenCategory}
            onPress={goToCategories}
            containerStyle={MARGIN_BOTTOM(16)}
          />
          <Input
            error={errors.title}
            value={title}
            onChangeText={onChangeTitle}
            style={MARGIN_BOTTOM(20)}
            label={t("textFields.title")}
            placeholder={t("textFields.title2Placeholder")}
          />
          <Input
            error={errors.description}
            value={description}
            onChangeText={onChangeDescription}
            style={MARGIN_BOTTOM(20)}
            label={t("textFields.description")}
            placeholder={t("textFields.descriptionPlaceholder")}
            multiline
          />
          <MediaInput
            hasPrimary={hasPrimary}
            error={errors.media?.message}
            onChange={onChange}
            value={images}
            style={MEDIA}
          />

          <Picker
            error={errors.area}
            value={selectedDistrict}
            modalTitle={t("textFields.districtPlaceholder")}
            onChange={setDistrict}
            items={districs}
            placeholder={t("textFields.districtPlaceholder")}
            label={t("textFields.district")}
            containerStyle={MARGIN_BOTTOM(16)}
          />
          <Picker
            error={errors.area}
            value={selectedArea}
            modalTitle={t("textFields.areaPlaceholder")}
            onChange={setArea}
            items={areas}
            placeholder={t("textFields.areaPlaceholder")}
            label={t("textFields.area")}
          />
        </ScrollView>
      </Body>
      <Footer>
        <GradientButton onPress={onSubmit} text={t("common.nextStep")} />
      </Footer>
    </Screen>
  )
}
