import { useNavigation } from "@react-navigation/native"
import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { Body, Footer, GradientButton,Header, MenuList, Screen } from "../../../components"
import cars from "../../../mocks/cars"
import countries from "../../../mocks/countries"
import { PostStack } from "../../../navigators/constans"
import { setSelectedCountry } from "../../../store/ducks/category/actions"
import {
  selectSelectedCategory,
  selectSelectedCountry,
} from "../../../store/ducks/category/selectors"

export const CountriesScreen: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const country = useSelector(selectSelectedCountry)
  const category = useSelector(selectSelectedCategory)
  const navigation = useNavigation()
  const selectCountry = (label: keyof typeof cars) => {
    dispatch(setSelectedCountry(label))
  }

  const goBack = () => {
    navigation.goBack()
  }

  const openCars = () => {
    if (country) {
      navigation.navigate(PostStack.fabric, { country: country })
    }
  }
  return (
    <Screen>
      <Header leftIcon="back" onLeftPress={goBack} title={category} />
      <Body withBackGroundImage>
        <MenuList selectedItem={country} onItemPress={selectCountry} items={countries} />
      </Body>
      <Footer>
        <GradientButton onPress={openCars} text={t("common.nextStep")} />
      </Footer>
    </Screen>
  )
}
