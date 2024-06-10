import { useNavigation } from "@react-navigation/core"
import React from "react"
import { View } from "react-native"

import { Body, Header, NotificationItem, Screen } from "../../../components"
import { LIST_ITEM } from "./styles"

export const NotificationScreen = () => {
  const { goBack } = useNavigation()
  return (
    <Screen>
      <Header title="Notifications" leftIcon="back" onLeftPress={goBack} />
      <Body>
        <View style={LIST_ITEM}>
          <NotificationItem active />
        </View>
        <View style={LIST_ITEM}>
          <NotificationItem />
        </View>
        <View style={LIST_ITEM}>
          <NotificationItem />
        </View>
      </Body>
    </Screen>
  )
}
