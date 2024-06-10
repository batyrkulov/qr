import { useNavigation } from "@react-navigation/native"
import React, { FC, useRef } from "react"
import { I18nManager, Platform, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { MARGIN_BOTTOM } from "../../common_styles"
import { HomeStack } from "../../navigators/constans"
import { CategoryTypes, ICategoryWithType } from "../../navigators/home-navigator"
import { IMainCategory } from "../../screens/HomePage"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { ICategory } from "../../store/ducks/category/types"
import { Icon } from "../icon/icon"
import { MenuItem } from "../menu-item"
import { Text } from "../text/text"
import { CONTAINER, HEADER, SCROLL, SCROLL_CONTENT, SEARCH } from "./styles"

type CategoryProps = {
  category?: IMainCategory
  name?: string
  items: ICategoryWithType[]
  onPress?: (category: ICategory) => void
  withBackground?: boolean
}

export const Category: FC<CategoryProps> = ({ name, category, items, onPress }) => {
  const navigation = useNavigation()
  const scroll = useRef<ScrollView>()
  const goToCategory = (subcategory: ICategory) => {
    navigation.navigate(HomeStack.categoryScreen, { category: subcategory, mainCategory: category })
  }
  const goToPostsList = (category: ICategoryWithType) => {
    navigation.navigate(HomeStack.postsListScreen, { category })
  }
  const handlerPress = (item: ICategoryWithType) => (item.is_last ? goToPostsList : goToCategory)
  const scrollListToStart = (contentWidth) => {
    if (I18nManager.isRTL && Platform.OS === "android") {
      scroll.current.scrollTo({ x: contentWidth, animated: false })
    }
  }
  
  return (
    <View>
      <View style={[HEADER, MARGIN_BOTTOM(16)]}>
        <Text preset="header2">{category?.short_name || name}</Text>
        {category && (
          <Icon
            onPress={() => goToPostsList({ ...category, type: CategoryTypes.ALL })}
            style={SEARCH}
            icon="searchBlack"
          />
        )}
      </View>
      <ScrollView
        onContentSizeChange={scrollListToStart}
        ref={scroll}
        horizontal
        automaticallyAdjustContentInsets={true}
        style={CONTAINER}
        contentContainerStyle={SCROLL}
        showsHorizontalScrollIndicator={false}
      >
        <View style={SCROLL_CONTENT}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              selected={false}
              onPress={onPress || handlerPress(item)}
              item={item}
              style={MARGIN_RIGHT(25)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
