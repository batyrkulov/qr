import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/core"
import React from "react"

import { IDealer } from "../api/post"
import { CustomBottomTabBar } from "../components"
import { Favorites } from "../screens/Favorites"
import { AccountNavigator } from "./account-navigator"
import { ChatNavigator } from "./chat-navigator"
import { BottomTabStack, ChatStack, HomeStack } from "./constans"
import { HomeNavigator } from "./home-navigator"
import { PostStackNavigator } from "./post-stack"

export type PrimaryParamList = {
  homeStack: undefined
  messenger?: { intercoluctor: IDealer }
  postYourListing: undefined
  favorite: undefined
  personal: undefined
}

const Tab = createBottomTabNavigator<PrimaryParamList>()

export function BottomTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTabBar {...props} />}>
      <Tab.Screen
       options={({ route }) => ({
        tabBarVisible: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""

          if (routeName === HomeStack.post) {
            return false
          }

          return true
        })(route),
        unmountOnBlur: true,
      })}
        name={BottomTabStack.homeStack}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={BottomTabStack.messenger}
        component={ChatNavigator}
        options={({ route }) => ({
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""

            if (routeName === ChatStack.chat) {
              return false
            }

            return true
          })(route),
          unmountOnBlur: true,
        })}
      />
      <Tab.Screen
        name={BottomTabStack.postYourListing}
        component={PostStackNavigator}
        options={{ tabBarVisible: false, unmountOnBlur: true }}
      />
      <Tab.Screen
        options={{ unmountOnBlur: true }}
        name={BottomTabStack.favorite}
        component={Favorites}
      />
      <Tab.Screen
        options={{ unmountOnBlur: true }}
        name={BottomTabStack.personal}
        component={AccountNavigator}
      />
    </Tab.Navigator>
  )
}
