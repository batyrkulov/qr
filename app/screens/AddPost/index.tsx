import { StackActions, useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useDispatch, useSelector } from "react-redux"

import { MARGIN_BOTTOM } from "../../common_styles"
import { Icon, Screen, Text } from "../../components"
import { Body } from "../../components/body"
import { Footer } from "../../components/footer"
import { GradientButton } from "../../components/gradient-button"
import { AppStack, PostStack } from "../../navigators/constans"
import { clearChosenCategories } from "../../store/ducks/category/actions"
import { clearLocations } from "../../store/ducks/location/actions"
import { selectIsShowPayment } from "../../store/ducks/meta/selectors"
import { clearPostData, setPostOption } from "../../store/ducks/newPost/actions"
import { PostTypesId } from "../../store/ducks/newPost/types"
import { color } from "../../theme"
import { BTN } from "../FillProfile/styles"
import {
  BTN_TEXT,
  CARD,
  CONTAINER,
  FIRST,
  GRADIENT,
  HEADER,
  ICON,
  SECOND,
  SELECTED,
  TEXT,
  THIRD,
} from "./styles"

export const AddPostScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const isShowPayment = useSelector(selectIsShowPayment)
  const handleNext = (id: number) => {
    switch (id) {
      case 0:
        dispatch(setPostOption({ option: "post_type_id", value: PostTypesId.Sell }))
        navigation.dispatch(StackActions.push(PostStack.categories))
        break
      case 1:
        dispatch(setPostOption({ option: "post_type_id", value: PostTypesId.Buy }))
        navigation.dispatch(StackActions.push(PostStack.wanted))
        break
      case 2:
        dispatch(setPostOption({ option: "post_type_id", value: PostTypesId.Trading }))
        navigation.dispatch(StackActions.push(PostStack.trading))
        break
      default:
        break
    }
  }

  const goToHome = () => {
    navigation.dispatch(StackActions.replace(AppStack.bottomTabStack))
  }

  useFocusEffect(() => {
    dispatch(clearPostData())
    dispatch(clearLocations())
    dispatch(clearChosenCategories())
  })

  return (
    <>
      <Screen backgroundColor={color.background}>
        <Body withBackGroundImage>
          <View style={HEADER}>
            <Icon style={ICON} onPress={goToHome} icon="home" />
            <Text style={TEXT} preset="header">
              {t("addPost.title")}
            </Text>
          </View>
          <Text style={MARGIN_BOTTOM(24)} preset="secondary">
            {t("addPost.question")}
          </Text>
          <View style={CONTAINER}>
            <TouchableOpacity
              style={[CARD, FIRST, MARGIN_BOTTOM(15)]}
              onPress={() => handleNext(0)}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.5, 1]}
                style={GRADIENT}
                colors={["#9be4fe", "#cdf4fe", "#FFFFFF"]}
              >
                <Icon icon="ad" />
                <Text style={BTN_TEXT}>{t("addPost.postListing")}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[CARD, SECOND]} onPress={() => handleNext(1)}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.5, 1]}
                style={GRADIENT}
                colors={["#baf6e6", "#cdf4fe", "#FFFFFF"]}
              >
                <Icon icon="wanted" />
                <Text style={BTN_TEXT}>{t("addPost.postWanted")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={CONTAINER}>
            <TouchableOpacity style={[CARD, THIRD]} onPress={() => handleNext(2)}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.9, 1]}
                style={GRADIENT}
                colors={[
                  "rgba(170, 153, 255, 0.4)",
                  "rgba(234, 230, 255, 0.4)",
                  "rgba(170, 153, 255, 0.4)",
                ]}
              >
                <Icon icon="trading" />
                <Text style={BTN_TEXT}>{t("addPost.trading")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Body>
      </Screen>
    </>
  )
}
