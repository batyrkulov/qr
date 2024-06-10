/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setFcmToken } from '../api/profile'
import { ChooseLanguageScreen } from "../screens/ChooseLanguage"
import { NoInternetScreen } from "../screens/NoInternet"
import { OnBoardingScreen } from "../screens/OnBoarding"
import { SplashScreen } from "../screens/Splash"
import { logout } from "../store/ducks/auth/actions"
import { clearUser, stopLoading } from "../store/ducks/profile/actions"
import { selectUser } from '../store/ducks/profile/selectors'
import { getUser } from "../store/ducks/profile/thunks"
import { RootState } from "../store/rootReducer"
import { RootStack as RootStackScreens } from "./constans"
import { MainNavigator } from "./main-navigator"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  mainStack: undefined
  splashScreen: undefined
  chooseLanguage: undefined
  onBoarding: undefined
  noInternet: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser())
    } else {
      dispatch(clearUser())
      dispatch(logout())
      dispatch(stopLoading())
    }
  }, [accessToken, dispatch])
  useEffect(() => {
    if (user) {
      AsyncStorage.getItem("fcm").then((token) => setFcmToken(token))
    }
  }, [user])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RootStackScreens.splashScreen}
    >
      <Stack.Screen
        name={RootStackScreens.splashScreen}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RootStackScreens.noInternet}
        component={NoInternetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name={RootStackScreens.chooseLanguage} component={ChooseLanguageScreen} />
      <Stack.Screen name={RootStackScreens.onBoarding} component={OnBoardingScreen} />
      <Stack.Screen
        name={RootStackScreens.mainStack}
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"


