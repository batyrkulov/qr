import React, { FC } from "react"
import { View } from "react-native"

import { Text } from ".."
import { CIRCLE, CIRCLE_ACTIVE, FROM, HEADER, INFO, ROOT, TEXT, TEXT_ACTIVE, TIME } from "./styles"

export const NotificationItem: FC<{ active?: boolean }> = ({ active }) => {
  return (
    <View style={ROOT}>
      <View style={active ? CIRCLE_ACTIVE : CIRCLE} />
      <View>
        <View style={HEADER}>
          <Text style={[active ? TEXT_ACTIVE : TEXT, FROM]} preset="bold">
            Gary Simon
          </Text>
          <Text style={[active ? TEXT_ACTIVE : TEXT, INFO]}>sent you a message</Text>
        </View>
        <Text style={TIME}>11:28</Text>
      </View>
    </View>
  )
}
