/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { StackActions, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MFSettings, MFTheme, MFWebView } from "myfatoorah-reactnative"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

import cars from "../mocks/cars"
import { AddPostScreen } from "../screens/AddPost"
import { CheckoutScreen } from "../screens/Checkout"
import { PaymentFailScreen } from "../screens/PaymentFail"
import { AddMediaScreen } from "../screens/PostYourListing/AddMedia"
import { CategoriesScreen } from "../screens/PostYourListing/Categories"
import { ChoosePlanScreen } from "../screens/PostYourListing/ChoosePlan"
import { CountriesScreen } from "../screens/PostYourListing/Countries"
import { ExtraInformationScreen } from "../screens/PostYourListing/ExtraInformation"
import { FabricsScreen } from "../screens/PostYourListing/Fabrics"
import { LocationScreen } from "../screens/PostYourListing/Location"
import { PostListingScreen } from "../screens/PostYourListing/PostListing"
import { TradingScreen } from "../screens/PostYourListing/TradingScreen"
import { WantedItemsScreen } from "../screens/PostYourListing/WantedItems"
import { ICategory } from "../store/ducks/category/types"
import { selectUser } from "../store/ducks/profile/selectors"
import { MainStack, PostStack, RootStack } from "./constans"

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
  addPost: undefined
  postListing: { isTrading?: boolean }
  categories: { category: ICategory; index: number }
  countries: { category: string }
  fabric: { country: keyof typeof cars }
  location: undefined
  media: { isTrading?: boolean }
  wanted: undefined
  extraInfo: { isTrading?: boolean }
  trading: undefined
  selectType?: string
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function PostStackNavigator() {
  const user = useSelector(selectUser)
  const navigation = useNavigation()
  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        StackActions.replace(RootStack.mainStack, { screen: MainStack.authStack }),
      )
    }
  }, [user, navigation])
  
  // useEffect(() => {
  //   const theme = new MFTheme("blue", "gray", "Payment", "Cancel");
  //   MFSettings.sharedInstance.setTheme(theme);
  //   MFSettings.sharedInstance.configure(
  //     process.env.PAYMENT_GATEWAY_URL,
  //     process.env.PAYMENT_GATEWAY_TOKEN,
  //   );
  // }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
      initialRouteName={PostStack.addPost}
    >
      <Stack.Screen name={PostStack.addPost} component={AddPostScreen} />
      <Stack.Screen name={PostStack.postListing} component={PostListingScreen} />
      <Stack.Screen name={PostStack.categories} component={CategoriesScreen} />
      <Stack.Screen name={PostStack.countries} component={CountriesScreen} />
      <Stack.Screen name={PostStack.fabric} component={FabricsScreen} />
      <Stack.Screen name={PostStack.location} component={LocationScreen} />
      <Stack.Screen name={PostStack.media} component={AddMediaScreen} />
      <Stack.Screen name={PostStack.wanted} component={WantedItemsScreen} />
      {/* <Stack.Screen name={PostStack.checkout} component={CheckoutScreen} />
      <Stack.Screen name={PostStack.paymentFail} component={PaymentFailScreen} />
      <Stack.Screen name={PostStack.plan} component={ChoosePlanScreen} /> */}
      <Stack.Screen name={PostStack.trading} component={TradingScreen} />
      <Stack.Screen name={PostStack.extraInfo} component={ExtraInformationScreen} />
      {/* <Stack.Screen
        name={PostStack.MFWebView}
        component={MFWebView}
        options={{ ...MFWebView.navigationOptions, headerShown: true, title: "Payment" }}
      /> */}
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
