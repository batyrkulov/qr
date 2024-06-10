import { useNavigation } from "@react-navigation/native"
import React, { FC, useEffect, useRef, useState } from "react"
import { Dimensions, ImageStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { useSelector } from "react-redux"

import { IDetailedPost } from "../../api/post"
import { ROW } from "../../common_styles"
import { AppStack } from "../../navigators/constans"
import { selectOptionsTranslations } from "../../store/ducks/meta/selectors"
import { color } from "../../theme"
import { photoUrl } from "../../utils/axios"
import { numberWithCommas } from "../../utils/numberWithCommas"
import { Icon } from ".."
import { PostItem, PostItemType } from "../post-item"
import { Text } from "../text/text"
import { CONTAINER } from "./styles"

type RecommendedCarouselProps = {
  items: IDetailedPost[]
}

export const DOT: ViewStyle = {
  width: 8,
  borderRadius: 50,
  height: 8,
}

export const RecommendedCarousel: FC<RecommendedCarouselProps> = ({ items }) => {
  const carousel = useRef()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    FastImage.preload(
      items.map((item: IDetailedPost) => ({
        uri:
          photoUrl +
          "/" +
          (item.post_file?.find((p) => p.is_primary)?.public_file.key ||
            item.post_file[0]?.public_file.key) +
          "_type2_compress",
      })),
    )
  }, [items])

  return (
    <View style={CONTAINER}>
      <Carousel
        onSnapToItem={setActiveIndex}
        ref={carousel}
        data={items}
        sliderWidth={Dimensions.get("screen").width - 40}
        renderItem={({ item }) => <RecommendedItem hidePrice={item.price === null} post={item} />}
        itemWidth={Dimensions.get("screen").width - 40}
      />
      <Pagination
        carouselRef={carousel}
        activeDotIndex={activeIndex}
        dotColor={color.palette.fountainBlue}
        dotStyle={DOT}
        inactiveDotColor={color.palette.blackSqueeze}
        dotsLength={items.length}
        inactiveDotScale={1}
      />
    </View>
  )
}

const IMAGE: ImageStyle = {
  width: 16,
  marginRight: 10,
}
const INFO_CONTAINER: ViewStyle = {
  ...ROW,
  alignItems: "flex-start",
  flexWrap: "wrap",
}
const HALF_WIDTH = { width: "50%" }
const WRAPPER = { minHeight: 300 }

const RecommendedItem: FC<{ post: IDetailedPost } & PostItemType> = ({ post, ...rest }) => {
  const navigation = useNavigation()
  const translations = useSelector(selectOptionsTranslations)
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate(AppStack.post, { id: post?.id })}
    >
      <PostItem showBetterImage customStyle={WRAPPER} {...post} {...rest}>
        <View style={INFO_CONTAINER}>
          {post.mileage && (
            <View style={[ROW, HALF_WIDTH]}>
              <Icon style={IMAGE} icon="speed" />
              <Text>{numberWithCommas(post.mileage || 0)} km</Text>
            </View>
          )}
          {post.fuel_type && translations[+post.fuel_type-1]?.value && (
            <View style={[ROW, HALF_WIDTH]}>
              <Icon style={IMAGE} icon="canister" />
              <Text> {translations[+post.fuel_type-1]?.value}</Text>
            </View>
          )}
          {post.import_country && translations[+post.import_country-1]?.value && (
            <View style={[ROW, HALF_WIDTH]}>
              <Icon style={IMAGE} icon="location" />
              <Text>{translations[+post.import_country-1]?.value}</Text>
            </View>
          )}
          {post.transmission && translations[+post.transmission-1]?.value && (
            <View style={[ROW, HALF_WIDTH]}>
              <Icon style={IMAGE} icon="mechanic" />
              <Text>{translations[+post.transmission-1]?.value}</Text>
            </View>
          )}
        </View>
      </PostItem>
    </TouchableOpacity>
  )
}
