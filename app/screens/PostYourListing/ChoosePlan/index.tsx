import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native-gesture-handler"
import { useToast } from "react-native-toast-notifications"
import { useDispatch, useSelector } from "react-redux"

import { createPost, getPlans, Plan, updatePost, updatePostPayment } from "../../../api/post"
import { Body, Footer, GradientButton, Header, Screen } from "../../../components"
import { PlanListItem } from "../../../components/plan-item"
import { AppStack, PostStack } from "../../../navigators/constans"
import { useMixpanel } from "../../../providers/mixpanel"
import { selectUserIsAdmin } from "../../../store/ducks/auth/selectors"
import { selectIsShowPayment } from "../../../store/ducks/meta/selectors"
import { setPostOption } from "../../../store/ducks/newPost/actions"
import { selectNewPost } from "../../../store/ducks/newPost/selectors"
import { PostTypesId } from "../../../store/ducks/newPost/types"
import { BTN, FOOTER } from "./styles"

export const ChoosePlanScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute()
  const toast = useToast()
  const mixpanel = useMixpanel()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isShowPayment = useSelector(selectIsShowPayment)
  const [plans, setPlans] = useState<Plan[]>([])
  const [price, setPrice] = useState<number>()
  const newPost = useSelector(selectNewPost)
  const userIsAdmin = useSelector(selectUserIsAdmin)
  
  const postId = params?.postId || newPost.id
  const postTypeId = params?.postTypeId || newPost.post_type_id
  const paymentPlanId = newPost.payment_plan_id
  const isRefresh = params?.isRefresh || false
  
  const goBack = () => {
    navigation.goBack()
  }

  const activePlans = useMemo(() => plans.filter((plan) => plan.price), [plans])

  const choosePlan = useCallback(
    (id: number | string, price: number) => {
      dispatch(setPostOption({ option: "payment_plan_id", value: id }))
      setPrice(price)
    },
    [dispatch],
  )

  useEffect(() => {
    if (userIsAdmin || !isShowPayment || postTypeId === PostTypesId.Trading) {
      let payment_plan_id = null
      switch (postTypeId) {
        case PostTypesId.Buy:
          payment_plan_id = 7
          break
        case PostTypesId.Sell:
          payment_plan_id = 6
          break
        case PostTypesId.Trading:
          payment_plan_id = 8
          break

        default:
          break
      }
      if (!postId) {
        createPost({ ...newPost, payment_plan_id }).then(({ data }) => {
          mixpanel.track("Post created", { post_id: data.id })
          navigation.dispatch(StackActions.replace(AppStack.success))
        }).catch(e => console.log(e.message, 'eeeee'))
      } else {
        navigation.dispatch(StackActions.replace(AppStack.success))
      }
    }
  }, [isShowPayment, mixpanel, navigation, newPost])
  
  useEffect(() => {
    if (activePlans.length && postTypeId === PostTypesId.Buy) {
      choosePlan(activePlans[0].id, activePlans[0].price)
    }
  }, [choosePlan, newPost, activePlans])

  const goToNext = useCallback(() => {
    if (!postId) {
      createPost(newPost)
        .then(({ data }) => {
          mixpanel.track("Post created", { post_id: data.id })
          dispatch(setPostOption({ option: "id", value: data.id }))
          navigation.navigate(PostStack.checkout, { price })
        })
        // .catch((err) => toast.show(err.response?.data?.message || err.message))
        .catch((err) => toast.show("Choose Plan"))
    } else if(isRefresh) {
      updatePostPayment({
        postId,
        paymentPlanId: Number(paymentPlanId),
      })
        .then((res) => {
          mixpanel.track("Post plan updated", { post_id: postId })
          dispatch(setPostOption({ option: "id", value: postId }))
          navigation.navigate(PostStack.checkout, { price })
        })
        // .catch((err) => toast.show(err.response?.data?.message || err.message))
        .catch((err) => toast.show("Choose plan"))
    } else {
      navigation.navigate(PostStack.checkout, { price })
    }
  }, [dispatch, isShowPayment, mixpanel, navigation, newPost, price, toast])

  useEffect(() => {
    if (price && paymentPlanId && postTypeId === PostTypesId.Buy) {
      if (!postId) {
        createPost(newPost)
          .then(({ data }) => {
            mixpanel.track("Post created", { post_id: data.id })
            if (isShowPayment && !userIsAdmin) {
              dispatch(setPostOption({ option: "id", value: data.id }))
            } else {
              navigation.dispatch(StackActions.replace(AppStack.success))
            }
          })
            // .catch((err) => { toast.show(err.response?.data?.message || err.message) })
            .catch((err) => { toast.show("Choose plan") })
      } else {
        navigation.dispatch(StackActions.replace(PostStack.checkout, { price }))
      }
    }
  }, [dispatch, isShowPayment, mixpanel, navigation, newPost, price, toast])

  // Set Price
  useEffect(() => {
    if (paymentPlanId && plans.length) {
      const price = plans.find((plan) => paymentPlanId === plan.id)?.price
      setPrice(price)
    }
  }, [paymentPlanId, plans])

  // Get All Plans By Post Type
  useEffect(() => {
    if (postTypeId) {
      getPlans(postTypeId).then(({ data }) => {
        setPlans(data)
      })
    }
  }, [postTypeId])
 
  if (userIsAdmin || !isShowPayment || postTypeId !== PostTypesId.Sell) {
    return null
  }

  return (
    <Screen>
      <Header leftIcon="back" onLeftPress={goBack} title={t("choosePlan.title")} />
      <Body withBackGroundImage>
        <ScrollView showsVerticalScrollIndicator={false}>
          {activePlans.map((plan) => (
            <PlanListItem
              key={plan.id}
              options={{ label: plan.payment_plan_translation.name, value: plan.id }}
              onPress={(v) => choosePlan(v, plan.price)}
              isActive={paymentPlanId === plan.id}
              {...plan}
            />
          ))}
        </ScrollView>
      </Body>
      <Footer styles={FOOTER}>
        <GradientButton style={BTN} onPress={goToNext} text={t("common.choosePlan")} />
      </Footer>
    </Screen>
  )
}
