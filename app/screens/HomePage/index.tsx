import { useNavigation } from "@react-navigation/native"
import { AxiosResponse } from "axios"
import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Platform, TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image'
import { useSelector } from "react-redux"

import { getMainPage } from "../../api/categories"
import { getPostsFirstImages, getRecommendedPosts, IDetailedPost, PostFirstImage } from "../../api/post"
import { MARGIN_BOTTOM } from "../../common_styles"
import { Body, Screen, Text } from "../../components"
import { Category } from "../../components/category"
import { LatestIcon } from "../../components/icons/LatestIcon"
import { PremiumIcon } from "../../components/icons/PremiumIcon"
import { RecommendedCarousel } from "../../components/recommended-carousel"
import { HomeStack } from "../../navigators/constans"
import { CategoryTypes } from "../../navigators/home-navigator"
import { selectUser } from "../../store/ducks/profile/selectors"
import { photoUrl } from "../../utils/axios"
import { CATEGORY_CONTAINER, FIND_MORE_BTN, FIND_MORE_BTN_TEXT } from "./styles"

interface ICategory {
  id: number | string
  slug: string
  icon: string | null
  short_name: string
  full_name: string
  is_last: boolean
  category_description: {
    id: 8
    short_name: "British"
    full_name: "British"
  }
}

export interface IMainCategory extends ICategory {
  children: ICategory[]
}

export const HomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const isAuth = useSelector(selectUser)
  const [categories, setCategories] = useState<IMainCategory[]>([])
  const [recommendedPosts, setRecommendedPosts] = useState<IDetailedPost[]>([])
  const [loadingPage, setLoadingPage] = useState(true)
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    getMainPage()
      .then(({ data }) => setCategories(data))
      .catch((err) => console.log(err, "err"))
      .finally(() => {
        setLoadingPage(false)
      })
    if (Platform.OS === 'ios') {
      getPostsFirstImages().then((res: AxiosResponse<PostFirstImage[]>) => {
        FastImage.preload(res.data.map((item: PostFirstImage) => (
          {
            uri: photoUrl + '/' + item.key + '_type1_compress'
          }
        )))
      })
    }
  }, [])

  useEffect(() => {
    if (isAuth) {
      getRecommendedPosts()
        .then(({ data }) => setRecommendedPosts(data.posts))
        .catch(console.log)
        .finally(() => setLoadingPosts(false))
    } else {
      setLoadingPosts(false)
    }
  }, [isAuth])

  const loading = useMemo(() => loadingPage && loadingPosts, [loadingPage, loadingPosts])

  const goToCars = () => {
    const carsCategory = categories.find((c) => c.id === 2)
    navigation.navigate(HomeStack.postsListScreen, {
      category: {
        ...carsCategory,
        short_name: carsCategory.category_description.short_name,
        full_name: carsCategory.category_description.full_name,
        type: CategoryTypes.ALL,
      },
    })
  }

  if (loading) {
    return null
  }
  return (
    <Screen preset="scroll" backgroundColor={"white"}>
      <Body withBackGroundImage>
        <View style={MARGIN_BOTTOM(32)}>
          <Category
            name={t("home.featured")}
            onPress={(category) => {
              navigation.navigate(HomeStack.postsListScreen, { category })
            }}
            items={[
              {
                short_name: t("home.latest"),
                localIcon: PremiumIcon,
                id: 2,
                is_last: false,
                full_name: t("home.latest"),
                // type: CategoryTypes.LATEST,
                type: CategoryTypes.ALL,
              },
              {
                short_name: t("home.premium"),
                localIcon: LatestIcon,
                id: "premium",
                is_last: false,
                full_name: t("home.premium"),
                type: CategoryTypes.PREMIUM,
              },
            ]}
          />
        </View>
        {categories.slice(0, 3).map((category) => (
          <View key={category.id} style={[MARGIN_BOTTOM(32), CATEGORY_CONTAINER]}>
            <Category
              category={{
                ...category,
                short_name: category.category_description.short_name,
                full_name: category.category_description.full_name,
              }}
              items={category.children.map((c) => ({
                ...c,
                short_name: c.category_description.short_name,
                full_name: c.category_description.full_name,
              }))}
            />
          </View>
        ))}
        {!!isAuth && !!recommendedPosts.length && (
          <View style={MARGIN_BOTTOM(32)}>
            <Text style={MARGIN_BOTTOM(16)} preset="header2">
              {t("home.recommend")}
            </Text>
            <RecommendedCarousel items={recommendedPosts} />
            <TouchableOpacity onPress={goToCars} style={FIND_MORE_BTN}>
              <Text style={FIND_MORE_BTN_TEXT}> {t("home.find")}</Text>
            </TouchableOpacity>
          </View>
        )}

        {categories.slice(3, categories.length).map((category) => (
          <View key={category.id} style={[MARGIN_BOTTOM(32), CATEGORY_CONTAINER]}>
            <Category
              category={{
                ...category,
                short_name: category.category_description.short_name,
                full_name: category.category_description.full_name,
              }}
              items={category.children.map((c) => ({
                ...c,
                short_name: c.category_description.short_name,
                full_name: c.category_description.full_name,
              }))}
            />
          </View>
        ))}
      </Body>
    </Screen>
  )
}
