import AsyncStorage from "@react-native-community/async-storage"
import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { checkNotifications, requestNotifications } from "react-native-permissions"
import { useDispatch, useSelector } from "react-redux"

import { Icon, Screen } from "../../components"
import { RootStack } from "../../navigators/constans"
import { getIsShowPayment, getWantedInfo } from "../../store/ducks/meta/thunks"
import { getOnBoarding } from "../../store/ducks/onboarding/thunks"
import { RootState } from "../../store/rootReducer"
import { ICON, SCREEN } from "./styles"

export const SplashScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.profile.loading)
  const loadingOnboarding = useSelector((state: RootState) => state.onboarding.loading)
  const loadingMeta = useSelector((state: RootState) => state.meta.loading)
  const [loadingLang, setLoadingLang] = useState(true)
  const [needChoseLang, setNeedChoseLang] = useState<boolean>(true)
  useEffect(() => {
    if (!loading && !loadingLang && !loadingOnboarding && !loadingMeta) {
      if (!needChoseLang) {
        AsyncStorage.getItem("Onboarding").then((v) => {
          if (v) {
            navigation.dispatch(StackActions.replace(RootStack.mainStack))
          } else {
            navigation.dispatch(StackActions.replace(RootStack.onBoarding))
          }
        })
      } else {
        navigation.dispatch(StackActions.replace(RootStack.chooseLanguage))
      }
    }
  }, [navigation, loading, loadingLang, loadingOnboarding, needChoseLang, loadingMeta])

  useEffect(() => {
    dispatch(getOnBoarding())
    dispatch(getIsShowPayment())
    dispatch(getWantedInfo())
  }, [dispatch])

  useEffect(() => {
    checkNotifications().then(console.log)

    requestNotifications(["alert", "sound"])
  }, [])

  useEffect(() => {
    AsyncStorage.getItem("IS_FIRST").then((v) => {
      if (v) {
        setNeedChoseLang(false)
      } else {
        setNeedChoseLang(true)
      }
      setLoadingLang(false)
    })
  }, [])

  return (
    <Screen style={SCREEN} statusBar="dark-content" unsafe={true} preset="fixed">
      <Icon style={ICON} icon="logo" />
    </Screen>
  )
}
