import { StackActions, useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Image, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector } from "react-redux"

import { getFavouritePosts, IPost } from "../../api/post"
import { Body, Header, ProductPost, Screen, Text } from "../../components"
import { usePagination } from "../../hooks/usePagination"
import { AppStack, MainStack, RootStack } from "../../navigators/constans"
import { selectUser } from "../../store/ducks/profile/selectors"
import { CONTAINER_NO_POSTS, NO_AD_TITLE } from "../PostsList/styles"
import { ITEM_WRAPPER } from "./styles"

const Component = (): React.ReactElement => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(true)
  const user = useSelector(selectUser)

  const fetchPosts = useCallback(async (page = 1) => {
    setLoading(true)
    const { data } = await getFavouritePosts(page)
    setPosts((posts) => [...posts, ...data.posts])
    setLoading(false)
    return data
  }, [])

  const goToPost = (id: number) => {
    navigation.navigate(AppStack.post, { id })
  }

  const { fetchMore } = usePagination(fetchPosts)

  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        StackActions.replace(RootStack.mainStack, { screen: MainStack.authStack }),
      )
    }
  }, [user, navigation])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useFocusEffect(
    useCallback(() => {
      fetchMore()
      return () => {
        setLoading(true)
        setPosts([])
      }
    }, []),
  )

  const keyExtractor = useCallback((item, index) => `${item}-${index}`, [])

  if (!posts.length && !loading) {
    return (
      <Screen preset={"fixed"}>
        <Header leftIcon="back" onLeftPress={navigation.goBack} title={t("favorites.favorites")} />
        <Body withBackGroundImage>
          <View style={CONTAINER_NO_POSTS}>
            <Image source={require("../PostsList/Sad.png")} />

            <Text style={NO_AD_TITLE}>{t("myAccount.menu.favourite")}</Text>
          </View>
        </Body>
      </Screen>
    )
  }

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon="back" onLeftPress={navigation.goBack} title={t("favorites.favorites")} />
      <Body withBackGroundImage>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={ITEM_WRAPPER}>
              <TouchableOpacity onPress={() => goToPost(item.id)}>
                <ProductPost hidePrice={item.price === null} post={item} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={keyExtractor}
          numColumns={2}
          onEndReachedThreshold={0.2}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 0) return
            fetchMore()
          }}
          showsVerticalScrollIndicator={false}
        />
      </Body>
    </Screen>
  )
}
export const Favorites = React.memo(Component)
