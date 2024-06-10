import { useNavigation } from "@react-navigation/native"
import React, { FC } from "react"
import { ActivityIndicator, FlatList, FlatListProps, TouchableOpacity, Text } from "react-native"

import { IPost } from "../../api/post"
import { MARGIN_BOTTOM, SPACE_BETWEEN } from "../../common_styles"
import { HomeStack } from "../../navigators/constans"
import { ProductPost } from ".."
import { ITEM } from "./styles"
import { color } from "../../theme"

type ProductPostListProps = {
  isColumn?: boolean
  posts: IPost[]
  fetchMore: () => void
  isFetching?: boolean
  incrementViewCount?: (postId: number) => void
} & Partial<FlatListProps<IPost>>

export const ProductPostList: FC<ProductPostListProps> = ({
  isColumn = false,
  posts,
  fetchMore,
  isFetching,
  incrementViewCount,
  ...rest
}) => {
  const navigation = useNavigation()

  const goToProductPage = (id) => {
    return navigation.navigate(HomeStack.post, { id })
  }

  return (
    <FlatList
      columnWrapperStyle={!isColumn ? SPACE_BETWEEN : null}
      data={[...posts]}
      numColumns={isColumn ? 1 : 2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (incrementViewCount) incrementViewCount(item.id as number)
            goToProductPage(item.id)
          }}
          style={[ITEM(isColumn), MARGIN_BOTTOM(12)]}
        >
          <ProductPost hidePrice={item.price === null} post={item} />
        </TouchableOpacity>
      )}
      onEndReached={fetchMore}
      keyExtractor={(item) => item.id.toString()}
      {...rest}
      ListFooterComponent={
        isFetching ?
          <ActivityIndicator style={MARGIN_BOTTOM(15)} color={color.uploader} />
          : <></>
      }
    />
  )
}
