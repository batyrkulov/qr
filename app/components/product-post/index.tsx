import moment from "moment"
import React, { FC, useMemo } from "react"
import { ImageStyle, StyleProp, View } from "react-native"

import { numberWithCommas } from "../../utils/numberWithCommas"
import { IPost } from "../../api/post"
import { FLEX, ROW } from "../../common_styles"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { Icon } from "../icon/icon"
import { PostItem, PostItemType } from "../post-item"
import { Text } from "../text/text"

type ProductPostProps = {
  post: IPost
} & PostItemType

export const ProductPost: FC<ProductPostProps> = ({ post, ...rest }) => {
  const date = useMemo(() => moment(post.created_at).format("DD MMM"), [post])

  return (
    <PostItem hidePrice={post.price === null} {...post} {...rest}>
      <View style={ROW}>
        <View style={[FLEX(1), ROW]}>
          <Icon icon="calendarGrey" style={MARGIN_RIGHT(5) as StyleProp<ImageStyle>} />
          <Text preset="secondary">{date}</Text>
        </View>
        <View style={ROW}>
          <Text style={MARGIN_RIGHT(5)} preset="secondary">
            {numberWithCommas(post.view_count || 0)}
          </Text>
          <Icon style={MARGIN_RIGHT(5) as StyleProp<ImageStyle>} icon="eyeGrey" />
        </View>
      </View>
    </PostItem>
  )
}
