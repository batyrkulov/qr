/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"

import { useInternetConnection } from "../utils/useInternetConnection"
import { AppNavigator } from "./app-navigator"
import { AuthNavigator } from "./auth-navigator"
import { AccountStack, BottomTabStack, MainStack } from "./constans"
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from "@react-navigation/native"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  authStack: undefined
  appStack: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  const navigation = useNavigation();

  useInternetConnection()

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(BottomTabStack.personal, {
        screen: AccountStack.myListingsScreen,
      });
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.navigate(BottomTabStack.personal, {
            screen: AccountStack.myListingsScreen,
          });
        }
      });
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
      initialRouteName={MainStack.appStack}
    >
      <Stack.Screen name={MainStack.appStack} component={AppNavigator} />
      <Stack.Screen name={MainStack.authStack} component={AuthNavigator} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
