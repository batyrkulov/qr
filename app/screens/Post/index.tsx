import { RouteProp, StackActions, useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Dimensions,
  ImageStyle,
  ScrollView,
  Share,
  StyleProp,
  TouchableOpacity,
  View,
} from "react-native"
import FastImage from "react-native-fast-image"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { useSelector } from "react-redux"

import {
  getPostDetails,
  getPostsByUserId,
  IDetailedPost,
  IPost,
  PostFile,
  toggleIsPostFavourite,
} from "../../api/post"
import {
  COLOR,
  FLEX,
  INFO_LEFT,
  INFO_TEXT,
  MARGIN_BOTTOM,
  ROW_NO_RTL,
  SPACE_BETWEEN,
} from "../../common_styles"
import {
  Body,
  CarouselWithPagination,
  ContactButtons,
  Footer,
  Header,
  Icon,
  InfoLabel,
  PostInfo,
  ProductPost,
  ReportModal,
  Screen,
  SellerInfo,
  Text,
} from "../../components"
import { IconTypes } from "../../components/icon/icons"
import { ImageSlider } from "../../components/image-slider"
import { BTN_TEXT } from "../../components/post-info/styles"
import { LINK_BTN, TRANSFORM } from "../../components/seller-info/styles"
import { PrimaryParamList } from "../../navigators/app-navigator"
import { AppStack, PostStack } from "../../navigators/constans"
import { useMixpanel } from "../../providers/mixpanel"
import { selectUser } from "../../store/ducks/profile/selectors"
import { color } from "../../theme"
import { photoUrl } from "../../utils/axios"
import { createPostLink } from "../../utils/createLinks"
import { numberWithCommas } from "../../utils/numberWithCommas"
import { CONTAINER, MARGIN_RIGHT } from "../PostYourListing/ExtraInformation/styles"
import {
  BODY,
  DESCRIPTION_CTR,
  DESCRIPTION_TEXT,
  MAP,
  MAP_CONTAINER,
  OTHER_POSTS_TITLE,
  REFRESH_LISTING_BTN,
  REFRESH_LISTING_BTN_LABEL,
  REPORT,
  REPORT_TEXT,
  SLIDER_ITEM,
  SUBHEADER,
} from "./styles"

type PostScreenRouteProp = RouteProp<PrimaryParamList, AppStack.post>

export const PostScreen: FC = () => {
  const navigation = useNavigation()
  const mixpanel = useMixpanel()
  const { t } = useTranslation()
  const { params } = useRoute<PostScreenRouteProp>()
  const isArquived = params.isArchived;
  const [isFavourite, setFavourite] = useState(false)
  const [isReportModalVisible, setIsReportModalVisible] = useState(false)
  const [details, setDetails] = useState<IDetailedPost>(null)
  const [otherPosts, setOtherPosts] = useState<IPost[]>([])
  const currentUser = useSelector(selectUser)

  const isPostCurrentUser = currentUser !== null && currentUser.id === details?.user?.id;

  const isScreenFocused = useIsFocused()

  const postSliderItems = useMemo(
    () =>
      otherPosts.reduce((acc, _, index, arr) => {
        const curIndex = acc.length + index
        if (arr[curIndex]) {
          acc.push([arr[curIndex]])
        }
        if (arr[curIndex + 1]) {
          acc[acc.length - 1].push(arr[curIndex + 1])
        }
        console.log(acc,"ACCCCC")
        return acc
      }, []),
    [otherPosts],
  )

  const createdAt = useMemo(
    () => details?.created_at && moment(details.created_at).format("DD/MM/YY"),
    [details],
  )

  const images = useMemo(
    () =>
      details?.post_file.map((file) => ({
        url: file.public_file.url,
        type: file.public_file.mime_type?.split("/")[0],
      })),
    [details?.post_file],
  )

  useEffect(() => {
    if (isScreenFocused && params.id) {
      getPostDetails(params.id)
        .then(({ data }) => {
          setDetails(data)
          setFavourite(data.is_favorite)
          console.log(details,"DATAAAA")
          FastImage.preload(
            data.post_file.map((item: PostFile) => ({
              uri: photoUrl + "/" + item.public_file.key + "_type2_compress",
            })),
          )
        })
        .catch(console.log)
    } else {
      setDetails(null)
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (details?.user?.id) {
      getPostsByUserId({ id: details?.user?.id, page: 1 }).then(({ data }) =>
        setOtherPosts(data.posts),
      )
    }
  }, [details?.user?.id])

  const goBack = () => {
    navigation.goBack()
  }
  const toogleFavourite = () => {
    if (!isFavourite) {
      mixpanel.track("Post Liked", { post_id: details.id })
    }
    toggleIsPostFavourite(isFavourite, details.id)
    setFavourite(!isFavourite)
  }
  const goToAdsFromDealer = () => {
    navigation.navigate(AppStack.adsFromDealer, { user: details.user })
  }
  const goToPost = (id) => {
    navigation.dispatch(StackActions.push(AppStack.post, { id }))
  }
  const openReportModal = () => {
    setIsReportModalVisible(true)
  }
  const closeReportModal = () => {
    setIsReportModalVisible(false)
  }
  const onPressShare = useCallback(async () => {
    try {
      await Share.share({
        message: await createPostLink(params.id),
      })
    } catch (e) { }
  }, [params?.id])

  const onPressEdit = () => {
    navigation.navigate(AppStack.postEdit, {details})
  }

  const rightIcons = !isPostCurrentUser ? [
    {
      icon: (isFavourite ? "favouriteFilled" : "favouriteOutlined") as IconTypes,
      onPress: toogleFavourite,
    },
    {
      icon: "share" as IconTypes,
      onPress: onPressShare,
    },
  ] : null

  const rightTextButtons = isPostCurrentUser ? [
    {
      text: t('common.edit'),
      onPress: onPressEdit
    },
  ] : null

  if (!details) {
    return (
      <Screen preset="scroll">
        <Header leftIcon="back" onLeftPress={goBack} />
      </Screen>
    )
  }

  const handleRefreshListing = () => {
    navigation.navigate(PostStack.plan, { 
      postId: params.id, 
      postTypeId: details.post_type_id,
      isRefresh: true,
    });
  }

  return (
    <Screen preset="fixed" style={CONTAINER}>
      <Header 
        leftIcon="back" 
        onLeftPress={goBack} 
        rightIcons={rightIcons}
        rightTextButtons={rightTextButtons}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageSlider images={images || []} />
        <Body containerStyles={BODY} withBackGroundImage>
          <View style={[ROW_NO_RTL, MARGIN_BOTTOM(4)]}>
            <Text style={FLEX(1)} preset="header2">
              {details.title}
            </Text>
            <View>
              <InfoLabel>
                <Icon style={INFO_LEFT as StyleProp<ImageStyle>} icon="eye" />
                <Text style={INFO_TEXT}>{numberWithCommas(details.view_count || 0)}</Text>
              </InfoLabel>
            </View>
          </View>
          <View style={[ROW_NO_RTL, MARGIN_BOTTOM(12)]}>
            {details.price !== null ? (
              <Text style={[FLEX(1), COLOR(color.palette.apple)]} preset="header2">
                {t("productScreen.price", { price: numberWithCommas(details.price || 0) })}
              </Text>
            ) : (
              <View style={FLEX(1)} />
            )}
            <InfoLabel>
              <Icon style={INFO_LEFT as StyleProp<ImageStyle>} icon="calendar" />
              <Text style={INFO_TEXT}>{createdAt}</Text>
            </InfoLabel>
          </View>
          {!!details.mileage && (
            <Text style={[MARGIN_BOTTOM(24), SUBHEADER]} preset="subheader">
              {t("productScreen.mileage", { amount: numberWithCommas(details.mileage || 0) })}
            </Text>
          )}
          <View style={[MARGIN_BOTTOM(24), DESCRIPTION_CTR]}>
            <Text preset="secondary">{t("productScreen.description")}</Text>
            <Text style={DESCRIPTION_TEXT}>{details.description}</Text>
          </View>
          <View style={MARGIN_BOTTOM(24)}>
            <PostInfo data={details} />
          </View>
          <View style={[ROW_NO_RTL, MARGIN_BOTTOM(16)]}>
            <Text preset="header2" style={FLEX(1)}>
              {t("productScreen.location")}
            </Text>
            <InfoLabel>
              <Icon style={INFO_LEFT as StyleProp<ImageStyle>} icon="locationBlue" />
              <Text style={INFO_TEXT}>{details.area?.area_description.name}</Text>
            </InfoLabel>
          </View>
          <View style={MAP_CONTAINER}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={MAP}
              region={{
                latitude: details?.area?.coordinates?.x,
                longitude: details?.area?.coordinates?.y,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
            />
          </View>

          <View style={MARGIN_BOTTOM(32)}>
            <SellerInfo
              {...details.client_phone_number && { specialPhone: details.client_phone_number }}
              data={details.user}
            />
            <TouchableOpacity onPress={goToAdsFromDealer} style={[ROW_NO_RTL, LINK_BTN]}>
              <Text style={BTN_TEXT}>{t("productScreen.viewAllDeals")}</Text>
              <Icon style={TRANSFORM} icon="arrowDown" />
            </TouchableOpacity>
          </View>
        </Body>
        <View>
          <Text style={[MARGIN_BOTTOM(16), OTHER_POSTS_TITLE]} preset="header2">
            {t("productScreen.otherAds")}
          </Text>
          <CarouselWithPagination
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width - 30}
            data={postSliderItems}
            slideStyle={[ROW_NO_RTL, SPACE_BETWEEN]}
            renderItem={({ item }) => (
              <>
                {item.map((post: IPost) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => goToPost(post.id)}
                    key={item.id}
                    style={SLIDER_ITEM}
                  >
                    <ProductPost
                      customStyle={{ height: "98%" }}
                      hidePrice={post.price === null}
                      post={post}
                    />
                  </TouchableOpacity>
                ))}
              </>
            )}
          />
        </View>
        <TouchableOpacity onPress={openReportModal} style={[ROW_NO_RTL, REPORT, MARGIN_BOTTOM(40)]}>
          <Icon style={MARGIN_RIGHT(5) as StyleProp<ImageStyle>} icon="report" />
          <Text style={REPORT_TEXT}>{t("productScreen.report")}</Text>
        </TouchableOpacity>
      </ScrollView>
      {currentUser?.id !== details.user?.id && (
        <Footer fixed>
          <ContactButtons
            {...details.client_phone_number && { specialPhone: details.client_phone_number }}
            user={details.user}
          />
        </Footer>
      )}
      {currentUser?.id === details.user?.id && isArquived && (
        <Footer fixed>
          <TouchableOpacity onPress={handleRefreshListing} style={REFRESH_LISTING_BTN}>
            <Text style={REFRESH_LISTING_BTN_LABEL}>{t("postEdit.refreshListing")}</Text>
          </TouchableOpacity>
        </Footer>
      )}
      <ReportModal
        onBackdropPress={closeReportModal}
        onSwipeComplete={closeReportModal}
        onDismiss={closeReportModal}
        isVisible={isReportModalVisible}
        id={details.id}
      />
    </Screen>
  )
}
