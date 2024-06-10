import { RouteProp, useNavigation, useRoute } from "@react-navigation/core"
import { StackActions } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"

import { IDealer } from "../api/post"
import { useWS } from "../hooks/useWS"
import { ChatScreen } from "../screens/Chat"
import { ChatsListScreen } from "../screens/ChatsList"
import { selectUser } from "../store/ducks/profile/selectors"
import { RootState } from "../store/rootReducer"
import { PrimaryParamList as PrimaryParamListBottomTabStack } from "./bottom-tabs-navigator"
import { BottomTabStack, ChatStack, MainStack, RootStack } from "./constans"

export type PrimaryParamList = {
  chatList: undefined
  chat: { intercoluctor: IDealer }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

type ChatNavigatorRouteProp = RouteProp<PrimaryParamListBottomTabStack, BottomTabStack.messenger>

export function ChatNavigator() {
  const navigation = useNavigation()
  const { params } = useRoute<ChatNavigatorRouteProp>()
  const user = useSelector(selectUser)
  const token = useSelector((state: RootState) => state.auth.accessToken)
  const ws = useWS(token)

  useEffect(() => {
    if (user) {
      ws.connect()
      ws.onconnect((e) => {
        // connection opened
        console.log('ws connect open', e)
      })
    } else {
      navigation.dispatch(
        StackActions.replace(RootStack.mainStack, { screen: MainStack.authStack }),
      )
    }
    return () => {
      if (ws.ws) {
        ws.disconnect()
      }
    }
  }, [navigation, user, ws])

  useEffect(() => {
    if (params?.intercoluctor) {
      navigation.navigate(ChatStack.chat)
    }
    return () => navigation.setParams({ intercoluctor: null })
  }, [navigation, params?.intercoluctor])

  if (!user) return <View />

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
      initialRouteName={ChatStack.chatList}
    >
      <Stack.Screen name={ChatStack.chatList} component={ChatsListScreen} />
      <Stack.Screen
        name={ChatStack.chat}
        component={ChatScreen}
        initialParams={{ intercoluctor: params?.intercoluctor }}
      />
    </Stack.Navigator>
  )
}
