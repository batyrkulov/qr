/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import { createStackNavigator } from "@react-navigation/stack"
import moment from "moment"
import { MFSettings, MFTheme, MFWebView } from "myfatoorah-reactnative"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { IDealer } from "../api/post"
import { useDynamicLink } from "../hooks/useDynamicLink"
import { useMixpanel } from "../providers/mixpanel"
import { ChangeContactInfo } from "../screens/Account/changeContactInfoScreen"
import { ChangePassword } from "../screens/Account/ChangePasswordScreen"
import { CreateTicket } from "../screens/Account/CreateTicketScreen"
import { MyTickets } from "../screens/Account/MyTickets"
import { AdsFromDealerScreen } from "../screens/AdsFromDealer"
import { AdvancedSearchScreen } from "../screens/AdvancedSearch"
import { CheckoutScreen } from "../screens/Checkout"
import { FillProfileScreen } from "../screens/FillProfile"
import { PaymentFailScreen } from "../screens/PaymentFail"
import { PostScreen } from "../screens/Post"
import { PostEditScreen } from "../screens/PostEdit"
import { ExtraInfoScreen } from "../screens/PostEdit/ExtraInfo"
import { PostEditPhotoScreen } from "../screens/PostEdit/Photo"
import { ChoosePlanScreen } from "../screens/PostYourListing/ChoosePlan"
import { SuccessScreen } from "../screens/Success"
import { ICategory } from "../store/ducks/category/types"
import { getOptionsTranslations } from "../store/ducks/meta/thunks"
import { selectUser } from "../store/ducks/profile/selectors"
import { BottomTabs } from "./bottom-tabs-navigator"
import { AppStack, PostStack } from "./constans"

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
  profile: { isEdit?: boolean }
  success: { isTrading?: boolean }
  bottomTabStack: undefined
  post: { id: number | string }
  changePasswordScreen: undefined
  adsFromDealer: { user: IDealer }
  createTicketScreen: undefined
  myTicketsScreen: undefined
  changeEmail: undefined
  advancedSearch: { category: ICategory }
  changeContactInfo: undefined,
  postEdit: undefined,
  postEditPhoto: undefined,
  postEditExtraInfo: undefined,
  
  plan: undefined
  checkout: { price: number }
  MFWebView: undefined
  paymentFail: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function AppNavigator() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const mixpanel = useMixpanel()

  useDynamicLink()

  useEffect(() => {
    dispatch(getOptionsTranslations())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      mixpanel.identify(user.id.toString())
      mixpanel.getPeople().set("Email", user.email)
      mixpanel.getPeople().set("Name", user.full_name)
      mixpanel.getPeople().set("Last_login", moment().format("DD/MM/YY HH:mm"))
      mixpanel.flush()
    }
  }, [user, mixpanel])

  useEffect(() => {
    const theme = new MFTheme("blue", "gray", "Payment", "Cancel");
    MFSettings.sharedInstance.setTheme(theme);
    MFSettings.sharedInstance.configure(
      process.env.PAYMENT_GATEWAY_URL,
      process.env.PAYMENT_GATEWAY_TOKEN,
    );
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
      initialRouteName={
        user && !user?.is_profile_filled ? AppStack.profile : AppStack.bottomTabStack
      }
    >
      <Stack.Screen name={AppStack.bottomTabStack} component={BottomTabs} />
      <Stack.Screen name={AppStack.post} component={PostScreen} />
      <Stack.Screen name={AppStack.adsFromDealer} component={AdsFromDealerScreen} />
      <Stack.Screen name={AppStack.profile} component={FillProfileScreen} />
      <Stack.Screen name={AppStack.success} component={SuccessScreen} />
      <Stack.Screen name={AppStack.changePasswordScreen} component={ChangePassword} />
      <Stack.Screen name={AppStack.createTicketScreen} component={CreateTicket} />
      <Stack.Screen name={AppStack.myTicketsScreen} component={MyTickets} />
      <Stack.Screen name={AppStack.changeContactInfo} component={ChangeContactInfo} />
      <Stack.Screen name={AppStack.advancedSearch} component={AdvancedSearchScreen} />
      <Stack.Screen name={AppStack.postEdit} component={PostEditScreen} />
      <Stack.Screen name={AppStack.postEditPhoto} component={PostEditPhotoScreen} />
      <Stack.Screen name={AppStack.postEditExtraInfo} component={ExtraInfoScreen} />
      
      <Stack.Screen name={PostStack.checkout} component={CheckoutScreen} />
      <Stack.Screen name={PostStack.paymentFail} component={PaymentFailScreen} />
      <Stack.Screen name={PostStack.plan} component={ChoosePlanScreen} />
      <Stack.Screen
        name={PostStack.MFWebView}
        component={MFWebView}
        options={{ ...MFWebView.navigationOptions, headerShown: true, title: "Payment" }}
      />
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
