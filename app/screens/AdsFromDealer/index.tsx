import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Animated, Dimensions, View, ViewStyle } from "react-native"

import { getPostsByUserId, IPost } from "../../api/post"
import { FLEX, MARGIN_BOTTOM } from "../../common_styles"
import { Body, ContactButtons, Footer, Header, Screen, SellerInfo, Text } from "../../components"
import { ProductPostList } from "../../components/product-post-list"
import { usePagination } from "../../hooks/usePagination"
import { PrimaryParamList } from "../../navigators/app-navigator"
import { AppStack } from "../../navigators/constans"
import { color } from "../../theme"

type AdvancedSearchScreenRouteProp = RouteProp<PrimaryParamList, AppStack.adsFromDealer>

const SCROLL_CONTAINER: ViewStyle = {
  backgroundColor: color.background,
  paddingHorizontal: 20,
}

export const AdsFromDealerScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<AdvancedSearchScreenRouteProp>()
  const [posts, setPosts] = useState<IPost[]>([])

  const animatedValue = useRef(new Animated.Value(0)).current

  const startAnimation = (value) => {
    Animated.timing(animatedValue, {
      toValue: value,
      useNativeDriver: false,
    }).start()
  }
  // useEffect(() => {
  //   startAnimation()
  // }, [])
  const handleScroll = (e) => {
    const offsetValue = e.nativeEvent.contentOffset.y

    if (offsetValue <= 0) {
      startAnimation(0)
    } else {
      startAnimation(-300)
    }
  }
  const fetchPosts = useCallback(
    async (page = 1) => {
      const { data } = await getPostsByUserId({ id: params?.user.id, page })
      setPosts((posts) => {
        console.log(posts);
        return [...posts, ...data.posts]
      })
      return data
    },
    [params?.user.id],
  )
  const { fetchMore } = usePagination(fetchPosts)

  useEffect(() => {
    if (!posts.length) {
      fetchMore()
    }
  }, [fetchMore, posts.length])

  return (
    <Screen preset="fixed">
      <Header title={t("adsFromDealer.title")} leftIcon="back" onLeftPress={navigation.goBack} />

      <View style={[MARGIN_BOTTOM(100), { height: 280 }]}>
        <Body withBackGroundImage>
          <SellerInfo data={params?.user} />
          <Text style={MARGIN_BOTTOM(4)} preset="header2">
              {t("productScreen.dealerAdsTitle")}
          </Text>
        </Body>
      </View>
      <Animated.View
        style={[
          SCROLL_CONTAINER,
          !animatedValue ? FLEX(1) : {maxHeight: Dimensions.get("screen").height - 350},
          {
            top: animatedValue,
          },
        ]}
      >
        <ProductPostList
          onScrollEndDrag={handleScroll}
          posts={posts}
          fetchMore={fetchMore}
        />
      </Animated.View>
      <Footer fixed>
        <ContactButtons user={params?.user} />
      </Footer>
    </Screen>
  )
}
