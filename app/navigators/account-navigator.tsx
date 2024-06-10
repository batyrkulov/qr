import { StackActions, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { FAQInfo } from "../api/profile"
import { Account } from "../screens/Account"
import { AboutApp } from "../screens/Account/AboutAppScreen"
import { Agents } from "../screens/Account/AgentsScreen"
import { AskedQuestions } from "../screens/Account/AskedQuestionsScreen"
import { FAQ } from "../screens/Account/FAQScreen"
import { MyListings } from "../screens/Account/MyListingsScreen"
import { NotificationScreen } from "../screens/Account/Notification"
import { Payments } from "../screens/Account/PaymentsScreen"
import { RecentlyViewed } from "../screens/Account/RecentlyViewedScreen"
import { TermsScreen } from "../screens/Account/Terms"
import { store } from "../store"
import { getAppData } from "../store/ducks/app/thunks"
import { selectUser } from "../store/ducks/profile/selectors"
import { getUser } from "../store/ducks/profile/thunks"
import { RootState } from "../store/rootReducer"
import { AccountStack, MainStack, RootStack } from "./constans"

export type PrimaryParamList = {
  accountScreen: undefined
  myListingsScreen: undefined
  recentlyViewedScreen: undefined
  paymentsScreen: undefined
  aboutAppScreen: undefined
  agentsScreen: undefined
  faqScreen: undefined
  askedQuestionsScreen: {
    questions: { frequently_asked_question_translation: FAQInfo }[]
    title: string
  }
  terms: undefined
  notifications: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

const Component: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  const user = useSelector(selectUser)
  const navigation = useNavigation()
  const loadingUser = useSelector((state: RootState) => state.profile.loading)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const loading = useMemo(() => loadingUser || isLoadingUser || isLoadingData, [
    loadingUser,
    isLoadingUser,
    isLoadingData,
  ])
  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        StackActions.replace(RootStack.mainStack, { screen: MainStack.authStack }),
      )
    }
  }, [navigation, user])

  useEffect(() => {
    dispatch(getUser()).then(() => setIsLoadingUser(false))
  }, [dispatch])

  useEffect(() => {
    dispatch(getAppData()).then(() => setIsLoadingData(false))
  }, [dispatch])

  if (loading) {
    return <View />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name={AccountStack.accountScreen} component={Account} />
      <Stack.Screen name={AccountStack.myListingsScreen} component={MyListings} />
      <Stack.Screen name={AccountStack.recentlyViewedScreen} component={RecentlyViewed} />
      <Stack.Screen name={AccountStack.paymentsScreen} component={Payments} />
      <Stack.Screen name={AccountStack.aboutAppScreen} component={AboutApp} />
      <Stack.Screen name={AccountStack.terms} component={TermsScreen} />
      <Stack.Screen name={AccountStack.agentsScreen} component={Agents} />
      <Stack.Screen name={AccountStack.faqScreen} component={FAQ} />
      <Stack.Screen name={AccountStack.askedQuestionsScreen} component={AskedQuestions} />
      <Stack.Screen name={AccountStack.notifications} component={NotificationScreen} />
    </Stack.Navigator>
  )
}

export const AccountNavigator = React.memo(Component)
