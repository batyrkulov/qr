import React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"

import { numberWithCommas } from "../../utils/numberWithCommas"
import { IPost } from "../../api/post"
import { COLOR, MARGIN_BOTTOM } from "../../common_styles"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { ICategory } from "../../store/ducks/category/types"
import { color } from "../../theme"
import { photoUrl } from "../../utils/axios"
import { CameraIcon } from "../icons"
import { Text } from "../text/text"
import {
  CONTAINER,
  CONTENT,
  CURRENCY,
  IMAGE,
  PLAN_ICON,
  PRICE,
  ROW,
  ROW_START,
  SPACER,
  TEXT_ALIGN,
  TYPE_CARS,
  TYPE_TEXT,
} from "./styles"

export type PostItemType = React.PropsWithChildren<
  {
    category?: { category_description: ICategory }
    isShowPhotoCount?: boolean
    photoCount?: number
    currencyTextStyle?: TextStyle
    hidePrice?: boolean
    showTypeCars?: boolean
    image_uri?: string
    customStyle?: ViewStyle
    showBetterImage?: boolean
  } & Partial<IPost>
>

export const PostItem = ({
  isShowPhotoCount,
  children,
  photoCount,
  currencyTextStyle,
  hidePrice,
  showTypeCars,
  title,
  price,
  post_file,
  post_payment_plan,
  category,
  customStyle,
  showBetterImage,
}: PostItemType): React.ReactElement => {
  return (
    <View style={[CONTAINER, customStyle]}>
      <FastImage
        style={IMAGE}
        source={
          post_file
            ? {
                uri:
                  photoUrl +
                  "/" +
                  (post_file?.find((p) => p.is_primary)?.public_file.key ||
                    post_file[0]?.public_file.key) +
                  ("_type" + (showBetterImage ? "2" : "1") + "_compress"),
                priority: FastImage.priority.high,
              }
            : require("./car.png")
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={CONTENT}>
        <Text numberOfLines={1} style={[TEXT_ALIGN, MARGIN_BOTTOM(5)]} preset="header4">
          {title}
        </Text>
        <View style={[MARGIN_BOTTOM(8), ROW]}>
          <View style={ROW}>
            {!hidePrice ? (
              <>
                <Text style={[COLOR(color.palette.green), PRICE]}>
                  {numberWithCommas(price || 0)}
                </Text>
                <Text style={[COLOR(color.palette.green), CURRENCY]}>KWD</Text>
              </>
            ) : (
              <View style={SPACER} />
            )}
          </View>
          {isShowPhotoCount ? (
            <View style={ROW}>
              <Text style={MARGIN_RIGHT(5) as StyleProp<ImageStyle>} preset="secondary">
                {photoCount}
              </Text>
              <CameraIcon />
            </View>
          ) : post_payment_plan?.payment_plan.icon_url ? (
            <Image style={PLAN_ICON} source={{ uri: post_payment_plan.payment_plan.icon_url }} />
          ) : (
            <View style={PLAN_ICON} />
          )}
        </View>
        {showTypeCars && (
          <View style={ROW_START}>
            <View style={TYPE_CARS}>
              <Text text={category?.category_description.full_name || ""} style={TYPE_TEXT} />
            </View>
          </View>
        )}
        {children}
      </View>
    </View>
  )
}
