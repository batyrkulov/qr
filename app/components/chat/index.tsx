import React, { FC } from "react"
import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler"

import { IMessage } from "../../api/chats"
import { MARGIN_BOTTOM } from "../../common_styles"
import { Message } from "../message"

type ChatProps = {
  data: IMessage[]
  fetchMore: () => void
}

export const Chat: FC<ChatProps> = ({ data, fetchMore }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      inverted
      onEndReached={fetchMore}
      renderItem={({ item }: { item: IMessage }) => (
        <View key={item.id} style={MARGIN_BOTTOM(16)}>
          <Message {...item} />
        </View>
      )}
    />
  )
}
