import { useNavigation } from "@react-navigation/core"
import React, { useCallback, useEffect, useState } from "react"
import { FlatList, I18nManager, TextStyle, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { getMyPosts, IPost } from "../../../../api/post"
import { PostItem } from "../../../../components"
import { ArchivedIcon, WantedIcon } from "../../../../components/icons"
import { usePagination } from "../../../../hooks/usePagination"
import { AppStack } from "../../../../navigators/constans"
import { PostTypesId } from "../../../../store/ducks/newPost/types"

// const itemWidth = (Dimensions.get("screen").width - 40) * 0.46
// const margin = (Dimensions.get("screen").width - 40) * 0.07

const WRAPPER_STYLE: ViewStyle = {
  width: "48%",
  marginRight: "4%",
  marginBottom: 16,
}
const FLAT_LIST_STYLE: ViewStyle = {
  marginTop: 16,
}
export const CURRENCY_TEXT_STYLE: TextStyle = {
  fontSize: 12,
}
const WANTED_ICON: ViewStyle = {
  position: "absolute",
  ...(I18nManager.isRTL ? { right: 0 } : { left: 0 }),
  elevation: 4,
}
const ARCHIVED_ICON: ViewStyle = {
  position: "absolute",
  top: 8,
  ...(I18nManager.isRTL ? { left: 8 } : { right: 8 }),
  elevation: 4,
  zIndex: 2
}

type ListOfVehicleType = {
  isWanted: boolean
  isArchived: boolean
}
const Component = ({ isWanted, isArchived }: ListOfVehicleType): React.ReactElement => {
  const navigation = useNavigation()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const fecthListings = useCallback(
    (page = 1) => {
      const postTypeId = isWanted ? PostTypesId.Buy : PostTypesId.Sell
      return getMyPosts(isArchived, postTypeId, page)
        .then(({ data }) => {
          if (data.posts.length) {
            setListings((prev) => [...prev, ...data.posts])
          }
          return data
        })
        .finally(() => setLoading(false))
    },
    [isArchived, isWanted],
  )

  const { fetchMore, reset } = usePagination(fecthListings)

  useEffect(() => {
    if (!listings.length) {
      setLoading(true)
      fetchMore()
    }
  }, [fetchMore, listings.length])

  useEffect(() => {
    setListings([])
    reset()
  }, [isWanted, isArchived, reset])

  const renderItem = useCallback(
    (post: IPost) => {
      return (
        <View style={WRAPPER_STYLE}>
          <TouchableOpacity onPress={() => navigation.navigate(AppStack.post, { id: post.id, isArchived })}>
            {isWanted && (
              <View style={WANTED_ICON}>
                <WantedIcon />
              </View>
            )}
            {isArchived && !isWanted && <ArchivedIcon style={ARCHIVED_ICON} />}
            <PostItem
              {...post}
              isShowPhotoCount={!isWanted}
              photoCount={post.post_file.length}
              currencyTextStyle={CURRENCY_TEXT_STYLE}
              hidePrice={isWanted}
              showTypeCars={isWanted}
            />
          </TouchableOpacity>
        </View>
      )
    },
    [isArchived, isWanted, navigation],
  )

  return (
    <FlatList
      data={loading ? [] : listings}
      renderItem={({ item }) => renderItem(item)}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      style={FLAT_LIST_STYLE}
      onEndReachedThreshold={0.2}
      onEndReached={({ distanceFromEnd }) => {
        if (distanceFromEnd < 0) return
        fetchMore()
      }}
    />
  )
}
export const ListOfVehicle = React.memo(Component)
