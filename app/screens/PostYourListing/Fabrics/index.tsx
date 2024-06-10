import { RouteProp, useRoute } from "@react-navigation/core"
import { useNavigation } from "@react-navigation/native"
import React, { FC, useEffect,useState } from "react"
import { useTranslation } from "react-i18next"
import { I18nManager } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import {
  Body,
  Button,
  Footer,
  GradientButton,
  Header,
  MenuList,
  RadioOption,
  Screen,
} from "../../../components"
import { SelectModal } from "../../../components/select_modal"
import cars, { carsAr } from "../../../mocks/cars"
import models from "../../../mocks/models"
import { PostStack } from "../../../navigators/constans"
import { PrimaryParamList } from "../../../navigators/post-stack"
import { setSelectedFabric, setSelectedModel } from "../../../store/ducks/category/actions"
import {
  selectSelectedCategory,
  selectSelectedFabric,
  selectSelectedModel,
} from "../../../store/ducks/category/selectors"
import { ERROR_BTN, ERROR_BTN_TEXT } from "./styles"

type CarsScreenRouteProp = RouteProp<PrimaryParamList, PostStack.fabric>

export const FabricsScreen: FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<CarsScreenRouteProp>()
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [fabric, setFabric] = useState<string | null>(null)
  const [isError, setIsError] = useState<boolean>(false)
  const selectedModel = useSelector(selectSelectedModel)
  const selectedFabric = useSelector(selectSelectedFabric)
  const selectedCategory = useSelector(selectSelectedCategory)
  const onSubmit = () => {
    if (!selectedModel || !selectedFabric) {
      setIsError(true)
    } else {
      navigation.navigate(PostStack.postListing)
    }
  }

  const closeModal = () => {
    setIsSelect(false)
  }

  const onItemPress = (label: string) => {
    setFabric(label)
    setIsSelect(true)
  }

  const setOptions = (model: RadioOption) => {
    dispatch(setSelectedFabric(fabric))
    dispatch(setSelectedModel(model?.label || null))
    setIsSelect(false)
  }

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    }
  }, [isError])

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <Screen>
        <Header
          leftIcon="back"
          onLeftPress={goBack}
          title={`${params.country} ${selectedCategory}`}
        />
        <Body withBackGroundImage>
          <MenuList
            onItemPress={onItemPress}
            items={!I18nManager.isRTL ? cars[params.country] : carsAr[params.country]}
            selectedItem={selectedFabric}
          />
        </Body>
        <Footer>
          {!isError ? (
            <GradientButton onPress={onSubmit} text={t("cars.button")} />
          ) : (
            <Button text={t("cars.errorText")} style={ERROR_BTN} textStyle={ERROR_BTN_TEXT} />
          )}
        </Footer>
      </Screen>
      <SelectModal
        title={t("cars.modalTitle")}
        options={models}
        onApply={setOptions}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        onDismiss={closeModal}
        isVisible={isSelect}
      />
    </>
  )
}
