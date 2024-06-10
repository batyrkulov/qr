import { createStackNavigator } from "@react-navigation/stack"
import React from "react"

import { CategoryScreen } from "../screens/CategoryScreen"
import { HomeScreen } from "../screens/HomePage"
import { PostScreen } from "../screens/Post"
import { PostsListScreen } from "../screens/PostsList"
import { ICategory } from "../store/ducks/category/types"
import { HomeStack } from "./constans"

export enum CategoryTypes {
  PREMIUM = "Premium",
  LATEST = "Latest",
  ALL = "ALL",
}

export interface ICategoryWithType extends ICategory {
  type?: CategoryTypes
}

export type PrimaryParamList = {
  homePage: undefined
  categoryScreen: { category: ICategory; mainCategory: ICategory }
  postsListScreen: {
    category: ICategoryWithType
    mainCategory: ICategory
    filters?: { [key: string]: any }
    withSearch?: boolean
  }
  post: { id: number | string }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name={HomeStack.homePage} component={HomeScreen} />
      <Stack.Screen name={HomeStack.categoryScreen} component={CategoryScreen} />
      <Stack.Screen name={HomeStack.postsListScreen} component={PostsListScreen} />
      <Stack.Screen name={HomeStack.post} component={PostScreen} />
    </Stack.Navigator>
  )
}
