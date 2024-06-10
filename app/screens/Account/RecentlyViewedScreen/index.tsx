import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { getLatestPosts } from "../../../api/post"
import { Body, Header, ProductPost, Screen } from "../../../components"
import { usePagination } from "../../../hooks/usePagination"
import { AppStack } from "../../../navigators/constans"
import { ITEM_WRAPPER } from "./styles"

const Component = (): React.ReactElement => {
  const { goBack, navigate } = useNavigation()
  const { t } = useTranslation()
  const [posts, setPosts] = useState([])
  const fetchPosts = useCallback((page = 1) => {
    return getLatestPosts({ page }).then(({ data }) => {
      setPosts((prev) => [...prev, ...data.posts])
      return data
    })
  }, [])

  const { fetchMore } = usePagination(fetchPosts)

  useEffect(() => {
    if (!posts.length) {
      fetchMore()
    }
  }, [fetchMore, posts.length])

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={ITEM_WRAPPER}>
        <TouchableOpacity onPress={() => navigate(AppStack.post, { id: item.id })}>
          <ProductPost post={item} />
        </TouchableOpacity>
      </View>
    )
  }, [navigate])

  const keyExtractor = useCallback((item, index) => `${item}-${index}`, [])

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} title={t("myAccount.recentlyViewed")} onLeftPress={goBack} />
      <Body withBackGroundImage>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMore}
        />
      </Body>
    </Screen>
  )
}
export const RecentlyViewed = React.memo(Component)
