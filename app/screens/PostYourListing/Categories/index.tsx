import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TextStyle } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { useDispatch, useSelector } from "react-redux"

import {
  getAllCategories,
  getCategoryById,
  getModelsByCategory,
  getWantedCategories,
} from "../../../api/categories"
import { getWantedPlan } from "../../../api/meta"
import {
  Body,
  Header,
  MenuList,
  Notice,
  RadioOption,
  Screen,
  SelectModal,
  Text,
} from "../../../components"
import { AppStack, PostStack } from "../../../navigators/constans"
import { PrimaryParamList } from "../../../navigators/post-stack"
import { addSelectedCategory } from "../../../store/ducks/category/actions"
import { ICategory } from "../../../store/ducks/category/types"
import { selectWantedPrice } from "../../../store/ducks/meta/selectors"
import { setPostOption } from "../../../store/ducks/newPost/actions"
import { PostTypesId } from "../../../store/ducks/newPost/types"
import { RootState } from "../../../store/rootReducer"
import { NOTICE } from "../AddMedia/styles"

const NOTICE_TEXT: TextStyle = {
  fontSize: 14,
  lineHeight: 22,
}

type CategoryScreenRouteProp = RouteProp<PrimaryParamList, PostStack.categories>

export const CategoriesScreen = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { params } = useRoute<CategoryScreenRouteProp>()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const postTypeId = useSelector((state: RootState) => state.newPost.post.post_type_id)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(null)
  const [selectedModel, setSelectedModel] = useState<RadioOption>(null)
  const [models, setModels] = useState<RadioOption[]>([])
  const [isSelect, setIsSelect] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const totalPrice = useSelector(selectWantedPrice)

  const closeModal = () => {
    setIsSelect(false)
  }
  useEffect(() => {
    if (params?.category?.id) {
      getCategoryById({ id: params.category.id, isIncludeWanted: params.category.id === 110 }).then(
        ({ data }) => {
          setCategories(data.categories)
        },
      )
    } else {
      if (postTypeId === PostTypesId.Buy) {
        getWantedCategories().then(({ data }) => {
          setCategories(data.categories)
        })
      } else {
        getAllCategories().then(({ data }) => {
          setCategories(data.categories)
        })
      }
    }
  }, [params?.category, dispatch, postTypeId])

  const onItemPress = (item: ICategory) => {
    setIsLast(false)
    setSelectedCategory(item)
    dispatch(
      addSelectedCategory({
        categoryId: params?.index || 0,
        value: { name: item.short_name, id: item.id },
      }),
    )
    if (item.is_last) {
      dispatch(setPostOption({ option: "category_id", value: item.id }))
      getModelsByCategory(item.id)
        .then(({ data }) => {
          setModels(
            data.map((model) => ({
              label: model.name,
              value: model.id,
            })),
          )
          setIsLast(true)
          if (data.length) setIsSelect(true)
          setSelectedModel(null)
          dispatch(setPostOption({ option: "model_id", value: null }))
        })
        .catch(console.log)
    } else {
      navigation.dispatch(
        StackActions.push(PostStack.categories, {
          category: item,
          index: params?.index ? params.index + 1 : 1,
          details: params?.details,
          selectType: params?.selectType
        }),
      )
    }
  }

  const setModel = (option: RadioOption) => {
    if (option) {
      dispatch(
        addSelectedCategory({
          categoryId: "model",
          value: { name: option.label, id: option.value },
        }),
      )
      setSelectedModel(option)
      dispatch(setPostOption({ option: "model_id", value: option.value }))
      closeModal()
    } else {
      dispatch(
        addSelectedCategory({
          categoryId: "model",
          value: null,
        }),
      )
      setSelectedModel(null)
      dispatch(setPostOption({ option: "model_id", value: null }))
      closeModal()
    }

  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToNextCategory = useCallback(() => {
    if (!selectedCategory) {
      toast.show("Choose category")
      return
    }
    if (isLast && !selectedModel && models.length) {
      toast.show("Choose model")
      return
    }
    if (isLast) {

      if (params?.selectType === "PostEdit") {
        return navigation.navigate(AppStack.postEdit, { details: params?.details })
      }

      switch (postTypeId) {
        case PostTypesId.Sell:
          navigation.navigate(PostStack.postListing)
          break
        case PostTypesId.Buy:
          navigation.navigate(PostStack.wanted)
          break
        case PostTypesId.Trading:
          navigation.navigate(PostStack.postListing, { isTrading: true })
          break

        default:
          break
      }
    } else {
      navigation.dispatch(
        StackActions.push(PostStack.categories, {
          category: selectedCategory,
          index: params?.index ? params.index + 1 : 1,
        }),
      )
    }
  }, [
    isLast,
    models.length,
    navigation,
    params?.index,
    postTypeId,
    selectedCategory,
    selectedModel,
    toast,
  ])

  useEffect(() => {
    if (selectedModel) {
      goToNextCategory()
    }
  }, [goToNextCategory, selectedModel])

  useEffect(() => {
    if (!models.length && isLast && selectedCategory) {
      goToNextCategory()
    }
  }, [goToNextCategory, isLast, models.length, selectedCategory])

  return (
    <>
      <Screen preset="scroll">
        <Header
          title={params?.category?.full_name || t("categories.title")}
          onLeftPress={goBack}
          leftIcon="back"
        />

        <Body withBackGroundImage>
          {postTypeId === PostTypesId.Buy && (
            <Notice styles={NOTICE}>
              <Text style={NOTICE_TEXT}>
                {t("notices.wantedTotal")}
                <Text preset="bold" style={NOTICE_TEXT}>
                  {" "}
                  {totalPrice}KD{" "}
                </Text>
              </Text>
            </Notice>
          )}
          <MenuList
            selectedItem={selectedCategory?.id}
            onItemPress={onItemPress}
            items={categories}
          />
        </Body>
      </Screen>

      <SelectModal
        title={t("cars.modalTitle")}
        options={models}
        onApply={setModel}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        onDismiss={closeModal}
        isVisible={isSelect}
      />
    </>
  )
}
