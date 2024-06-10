/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./utils/ignore-warnings"
import "./utils/i18n"

import AsyncStorage from "@react-native-community/async-storage"
import messaging from '@react-native-firebase/messaging';
import { NavigationContainerRef } from "@react-navigation/native"
import React, { useEffect, useRef } from "react"
import { I18nManager } from "react-native"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import { ToastProvider } from "react-native-toast-notifications"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { addFcmToken } from './api/meta';
import {
  canExit,
  RootNavigator,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "./navigators"
import { mixpanel, MixpanelProvider } from "./providers/mixpanel"
import { persistor, store } from "./store"
import * as storage from "./utils/storage"
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App(): JSX.Element {
  const navigationRef = useRef<NavigationContainerRef>()
  // Notifications.registerRemoteNotifications();
  // Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
  //   // TODO: Send the token to my server so it could send back push notifications...
  //   AsyncStorage.setItem("fcm", event.deviceToken)
  //   console.log("Device Token Received", event.deviceToken)
  // })

  // Notifications.events().registerNotificationReceivedForeground(
  //   (notification: Notification, completion) => {
  //     console.log(`Notification received in foreground: `)

  //     completion({ alert: true, sound: true, badge: true })
  //   },
  // )

  // Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
  //   console.log(`Notification opened: ${notification.payload}`)
  //   completion()
  // })
  I18nManager.forceRTL(false)

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken()
    AsyncStorage.setItem("fcm", fcmToken)
    addFcmToken(fcmToken)
    if (fcmToken) {
      console.log("Your Firebase Token is:", fcmToken)
    } else {
      console.log("Failed", "No token received")
    }
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (enabled) {
      getFcmToken()
      console.log("Authorization status:", authStatus)
    }
  }

  useEffect(() => {
    requestUserPermission()
  }, [])

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.

  // otherwise, we're ready to render the app
  return (
    <ToastProvider placement="top" offsetTop={50}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <MixpanelProvider value={mixpanel}>
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </MixpanelProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  )
}

export default App
