import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { useToast } from "react-native-toast-notifications"
import { useSelector } from "react-redux"

import { ChatData, getChats } from "../../api/chats"
import { IDealer } from "../../api/post"
import { MARGIN_BOTTOM } from "../../common_styles"
import { Body, Header, Input, Screen } from "../../components"
import { ChatsListItem } from "../../components/chats-list-item"
import { useWS } from "../../hooks/useWS"
import { ChatStack } from "../../navigators/constans"
import { selectUser } from "../../store/ducks/profile/selectors"
import {useTranslation} from "react-i18next";

export const ChatsListScreen = () => {
  const user = useSelector(selectUser)
  const toast = useToast()
  const [chats, setChats] = useState<ChatData[]>([])
  const navigation = useNavigation()
  const ws = useWS()
  const { t } = useTranslation()
  const goToChat = (intercoluctor: IDealer) => {
    navigation.navigate(ChatStack.chat, { intercoluctor })
  }


  const onNewMessageReceive = useCallback(
    (e) => {
      const data = JSON.parse(e.data)
      if (user.id !== data.message.user.id) {
        toast.show("New message from " + data.message.user.full_name)
      }
      getChats()
        .then(({ data }) => setChats(data))
        .catch((error) => toast.show(error.response?.data?.message || error.message))
    },
    [toast, user.id],
  )

  useEffect(() => {
    ws.onmessage("new_message", onNewMessageReceive)
    ws.onmessage("send_message", onNewMessageReceive)
  }, [onNewMessageReceive, ws])

  useEffect(() => {
    getChats().then(({ data }) => setChats(data))
  }, [])

  return (
    <Screen>
      <Header
        title={t("myAccount.menu.chats")}
        leftIcon="back"
        onLeftPress={navigation.goBack}
      />
      <Body withBackGroundImage>
        {/* <Input noRTL placeholder="Search a chat" style={MARGIN_BOTTOM(20)} icon="searchBlue" /> */}
        <FlatList
          data={chats}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: ChatData }) => (
            <TouchableOpacity
              onPress={() => goToChat(item.participant.find((p) => user.id !== p.user.id).user)}
              style={MARGIN_BOTTOM(25)}
            >
              <ChatsListItem chat={item} />
            </TouchableOpacity>
          )}
        />
      </Body>
    </Screen>
  )
}
