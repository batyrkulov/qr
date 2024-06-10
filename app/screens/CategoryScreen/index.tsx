import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { FC, useEffect, useState } from "react"
import { ImageStyle, StyleProp, View } from "react-native"

import { getCategoryById } from "../../api/categories"
import { ROW_NO_RTL } from "../../common_styles"
import { Body, Icon, MenuList, Screen, Text } from "../../components"
import { HomeStack } from "../../navigators/constans"
import { PrimaryParamList } from "../../navigators/home-navigator"
import { ICategory } from "../../store/ducks/category/types"
import { MARGIN_RIGHT } from "../PostYourListing/ExtraInformation/styles"
import { HEADER, ICON_BACK } from "./styles"

type CategoryScreenRouteProp = RouteProp<PrimaryParamList, HomeStack.categoryScreen>

export const CategoryScreen: FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute<CategoryScreenRouteProp>()
  const [items, setItems] = useState<ICategory[]>([])

  useEffect(() => {
    getCategoryById({ id: params.category.id, isIncludeWanted: true }).then(({ data }) =>
      setItems(data.categories),
    )
  }, [params.category.id])

  return (
    <Screen>
      <Body withBackGroundImage>
        <View style={HEADER}>
          <View style={ROW_NO_RTL}>
            <Icon
              style={[MARGIN_RIGHT(20) as StyleProp<ImageStyle>, ICON_BACK]}
              icon="back"
              onPress={navigation.goBack}
            />
            <Text preset="header">{params.category?.full_name}</Text>
          </View>
        </View>
        <MenuList
          selectedItem={null}
          onItemPress={(category) =>
            navigation.navigate(HomeStack.postsListScreen, {
              category,
              mainCategory: params.mainCategory,
              filters: null,
            })
          }
          items={items}
        />
      </Body>
    </Screen>
  )
}
