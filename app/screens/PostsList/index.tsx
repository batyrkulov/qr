import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Image, View, RefreshControl } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import RNModal, { ModalProps as RNModalProps } from "react-native-modal"
import { getModelsByCategory } from "../../api/categories"
import {
  getAllPosts,
  getLatestPosts,
  getPostsByCategory,
  getPremiumPosts,
  IPost,
} from "../../api/post"
import { FLEX, MARGIN_BOTTOM, ROW_NO_RTL } from "../../common_styles"
import {
  Body,
  Header,
  Icon,
  Input,
  Screen,
  SelectButtonGroup,
  SelectButtonOption,
  Text,
  Button,
} from "../../components"
import { ProductPostList } from "../../components/product-post-list"
import { usePagination } from "../../hooks/usePagination"
import { AppStack, HomeStack } from "../../navigators/constans"
import { CategoryTypes, PrimaryParamList } from "../../navigators/home-navigator"
import { CONTAINER_NO_POSTS, FILTER, NO_AD_TEXT, NO_AD_TITLE } from "./styles"

type PostsListScreenRouteProp = RouteProp<PrimaryParamList, HomeStack.postsListScreen>

export const PostsListScreen: FC = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { params } = useRoute<PostsListScreenRouteProp>()
  const [models, setModels] = useState<SelectButtonOption[]>([])
  const [selectedModel, setSelectedModel] = useState<number | string>(null)
  const [posts, setPosts] = useState<IPost[]>([])
  const [search, setSearch] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false);
  const goBack = () => {
    navigation.goBack()
  }
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const goToAdvancedSearch = () => {
    navigation.navigate(AppStack.advancedSearch, { category: params.category })
  }
  useEffect(() => {
    if (params.category?.id) {
      getModelsByCategory(params.category.id).then(({ data }) =>
        setModels(data.map((m) => ({ label: m.name, value: m.id }))),
      )
    }
  }, [params])

  if (params.category.type !== CategoryTypes.PREMIUM) {
    if (!selectedModel) params.category.type = CategoryTypes.ALL
    else params.category.type = undefined
  }

  const fetchPosts = useCallback(
    (page = 1) => {
      setLoading(true)
      console.log("params.category.type", params.category.type)
      switch (params.category.type) {
        case CategoryTypes.PREMIUM:
          return getPremiumPosts({ page, filters: { ...params.filters, search } })
            .then(({ data }) => {
              setPosts((prev) => [...prev, ...data.posts])
              return data
            })
            .finally(() => setLoading(false))

        case CategoryTypes.LATEST:
          return getLatestPosts({ page, filters: { ...params.filters, search } })
            .then(({ data }) => {
              setPosts((prev) => [...prev, ...data.posts])
              return data
            })
            .catch(console.log)
            .finally(() => setLoading(false))
        case CategoryTypes.ALL:
          return getAllPosts({
            page,
            id: params.category.id,
            filters: { ...params.filters, search },
          })
            .then(({ data }) => {
              setPosts((prev) => [...prev, ...data.posts])
              return data
            })
            .finally(() => setLoading(false))

        default:
          return getPostsByCategory({
            category_id: params.category.id,
            filters: {
              ...params.filters,
              search,
              models: selectedModel ? selectedModel.toString() : [],
            },
            page,
          })
            .then(({ data }) => {
              setPosts((prev) => [...prev, ...data.posts])
              return data
            })
            .finally(() => setLoading(false))
      }
    },
    [params.category.id, params.category.type, params.filters, search, selectedModel],
  )

  const { fetchMore } = usePagination(fetchPosts)

  useEffect(() => {
    if (!posts.length) {
      fetchMore()
    }
  }, [fetchMore, posts.length, search])

  useEffect(() => {
    setPosts([])
  }, [params.filters, selectedModel])

  const handleSearch = () => {
    setLoading(true)
    setPosts([])
  }

  const newPosts: IPost[] = []
  posts.forEach(p => {
    if (!newPosts.some(np => np.id === p.id)) {
      newPosts.push(p)
    }
  })

  useEffect(() => {
    if (params?.filters?.search) {
      setSearch(params?.filters?.search)
    }
  }, [params?.filters?.search])

  const incrementViewCount = (postId: number) => {
    setPosts(posts.map(post => ({ ...post, ...post.id === postId && { view_count: post.view_count + 1 } })))
  }

  const NoPosts = () => {
    if (!posts.length && search) {
      return (
        <View style={CONTAINER_NO_POSTS}>
          <Image source={require("./feather_search.png")} />
          <Text style={NO_AD_TITLE}>Ad not found</Text>
          <Text style={NO_AD_TEXT}>Try searching the item with a different keyword.</Text>
        </View>
      )
    }
    return (
      <View style={CONTAINER_NO_POSTS}>
        <Image source={require("./Sad.png")} />

        <Text style={NO_AD_TITLE}>{t("productScreen.noAdsYet")}</Text>
        <Text style={NO_AD_TEXT}>Try searching in other categories</Text>
      </View>
    )
  }

  const isUsedSearchButton =
    params.mainCategory?.id === 2 ||
    params.mainCategory?.id === 3 ||
    params.category.id === 2 ||
    params.category.id === 3

  return (
    <Screen

    >
      <Header leftIcon="back" onLeftPress={goBack} title={params.category.full_name} />
      <Body withBackGroundImage>
        <View style={[MARGIN_BOTTOM(16), !isUsedSearchButton && ROW_NO_RTL]}>
          {isUsedSearchButton ? (
            <Button preset="search" text={t("support.search")} onPress={goToAdvancedSearch} />
          ) : (
            <Input
              noLabel
              icon="searchBlue"
              style={FLEX(1)}
              placeholder={t("support.search")}
              onChangeText={setSearch}
              value={search}
              onEndEditing={handleSearch}
              noRTL
            />
          )}
        </View>
        <ScrollView
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing}
              onRefresh={onRefresh} />
          }
        >
          <View style={MARGIN_BOTTOM(16)}>
            {!!models.length && (
              <SelectButtonGroup
                withAllOption
                value={selectedModel}
                // multiple
                onChange={(v: number) => {
                  setSelectedModel(v)
                }}
                fullWidth
                options={models}
                preset="scroll"
              />
            )}
          </View>
          {posts.length || loading ? (
            <ProductPostList
              incrementViewCount={incrementViewCount}
              isFetching={loading}
              posts={newPosts}
              fetchMore={fetchMore}
              isColumn={params.category.full_name === t("home.premium")}
            />
          ) : (
            <NoPosts />
          )}
        </ScrollView>
      </Body>
    </Screen>
  )
}
