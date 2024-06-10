import { useNavigation } from "@react-navigation/core"
import { RouteProp, useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"

import { CategorySectionTypes, ExtraInfoResponseItem, getExtraInfo } from "../../api/post"
import { MARGIN_BOTTOM } from "../../common_styles"
import { Body, CollapseList, Footer, GradientButton, Header, Input, Screen } from "../../components"
import { DynamicFilterOption } from "../../components/dynamic-filter-option"
import { PrimaryParamList } from "../../navigators/app-navigator"
import { AppStack, BottomTabStack, HomeStack } from "../../navigators/constans"
import { CONTAINER, DIVIDER } from "../PostYourListing/ExtraInformation/styles"
import {useTranslation} from "react-i18next";

type AdvancedSearchScreenRouteProp = RouteProp<PrimaryParamList, AppStack.advancedSearch>

export const AdvancedSearchScreen = () => {
  const { control, handleSubmit } = useForm()
  const { params } = useRoute<AdvancedSearchScreenRouteProp>()
  const { t } = useTranslation()

  const navigation = useNavigation()
  const [sections, setSections] = useState<ExtraInfoResponseItem[]>([])

  const goBack = () => {
    navigation.goBack()
  }

  const handleSearch = (filters) => {
    for (const item in filters) {
      if (filters[item]?.value) {
        filters[item] = filters[item].value
      }
      if (Array.isArray(filters[item])) {
        filters[item] = filters[item].map((f) => f?.value || f).join(",")
      }
    }
    navigation.navigate(AppStack.bottomTabStack, {
      screen: BottomTabStack.homeStack,
      params: { screen: HomeStack.postsListScreen, params: { category: params.category, filters } },
    })
  }

  useEffect(() => {
    if (params?.category.id) {
      getExtraInfo(CategorySectionTypes.GET, params.category.id).then(({ data }) =>
        setSections(data),
      )
    }
  }, [params?.category.id])

  return (
    <View style={CONTAINER}>
      <Screen preset="scroll">
        <Header title={t("advanced.title")} leftIcon="back" onLeftPress={goBack} />
        <Body withBackGroundImage>
          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <Input
                placeholder="Cars-Infinity-Any category"
                onChangeText={onChange}
                value={value}
                label={t("advanced.search")}
                style={MARGIN_BOTTOM(20)}
                icon="searchBlue"
                error={errors.search}
              />
            )}
          />

          {sections.map((section, i) => (
            <>
              <CollapseList
                key={section.id}
                initialState
                title={section.section.section_description.name}
              >
                {section.section.section_block.map((block) => {
                  return (
                    <View style={MARGIN_BOTTOM(16)} key={block.id}>
                      <DynamicFilterOption not_required block={block} control={control} />
                    </View>
                  )
                })}
              </CollapseList>
              {sections.length - 1 !== i && <View style={DIVIDER} />}
            </>
          ))}
        </Body>
      </Screen>
      <Footer fixed>
        <GradientButton text={t("advanced.search")} onPress={handleSubmit(handleSearch)} />
      </Footer>
    </View>
  )
}
