import { useNavigation, useRoute } from "@react-navigation/core"
import { RouteProp } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { Image, ImageStyle, TouchableOpacity, View } from "react-native"
import { useToast } from "react-native-toast-notifications"

import { getMessages, IMessage } from "../../api/chats"
import { FLEX, MARGIN_BOTTOM, ROW } from "../../common_styles"
import { AssetWithKey, Body, Footer, Header, Screen, Text } from "../../components"
import { Chat } from "../../components/chat"
import { ChatForm } from "../../components/chat-form"
import { AVATAR } from "../../components/chats-list-item/styles"
import { usePagination } from "../../hooks/usePagination"
import { useWS } from "../../hooks/useWS"
import { PrimaryParamList } from "../../navigators/chat-navigator"
import { AppStack, ChatStack } from "../../navigators/constans"
import { MARGIN_RIGHT } from "../PostYourListing/ExtraInformation/styles"
import { DISABLED, FOOTER, VIEW_ADS_BTN, VIEW_ADS_CONTAINER } from "./styles"
import {useTranslation} from "react-i18next";

type ChatScreenRouteProp = RouteProp<PrimaryParamList, ChatStack.chat>

export const ChatScreen = () => {
  const navigation = useNavigation()
  const ws = useWS()
  const { params } = useRoute<ChatScreenRouteProp>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [text, setText] = useState("")
  const [media, setMedia] = useState<AssetWithKey[]>([])
  const toast = useToast()
  const { t } = useTranslation()

  const fetchMessages = useCallback(
    async (page = 1) => {
      try {
        const { data } = await getMessages(params.intercoluctor.id, page)
        setMessages((messages) => [...messages, ...data.messages])
        return data
      } catch (error) {
        toast.show(error.response?.data?.message || error.message)
      }
    },
    [params.intercoluctor.id, toast],
  )

  const { fetchMore } = usePagination(fetchMessages)

  const goToDealerAds = () => {
    navigation.navigate(AppStack.adsFromDealer, { user: params.intercoluctor })
  }

  const onNewMessageReceive = useCallback(
    (e) => {
      const data = JSON.parse(e.data)
      if (data.message.user.id === params.intercoluctor.id) {
        const new_message: IMessage = data.message
        setMessages((prev) => [new_message, ...prev])
      }
    },

    [params.intercoluctor.id],
  )

  const onMessageSent = useCallback((e) => {
    const data = JSON.parse(e.data)
    const new_message: IMessage = data.message
    setMessages((prev) => [new_message, ...prev])
    setText("")
    setMedia([])
  }, [])
  useEffect(() => {
    ws.onmessage("new_message", onNewMessageReceive)
    ws.onmessage("send_message", onMessageSent)
  }, [onMessageSent, onNewMessageReceive, ws])

  useEffect(() => {
    if (!messages.length) {
      fetchMore()
    }
  }, [fetchMore, messages.length])

  const sendMessage = () => {
    if ((text || media.length) && !params.intercoluctor.is_removed) {
      ws.send("send_message", {
        receiver_user_id: params.intercoluctor.id,
        message: text,
        media_files: media.map((m) => ({ key: m.file_key, order: m.order })),
      })
    }
  }

  return (
    <Screen>
      <Header title={t("chat.title")} leftIcon="back" onLeftPress={navigation.goBack} />
      <Body withBackGroundImage>
        <View style={[ROW, VIEW_ADS_CONTAINER, MARGIN_BOTTOM(20)]}>
          <TouchableOpacity style={[ROW, FLEX(1)]}>
            <Image
              style={[AVATAR, MARGIN_RIGHT(10) as ImageStyle]}
              source={
                params.intercoluctor.avatar?.url
                  ? { uri: params.intercoluctor.avatar?.url }
                  : require("../../components/icons/noavatar.png")
              }
            />
            <Text preset="bold">
              {params.intercoluctor.full_name}
              <Text preset="error">{params.intercoluctor.is_removed ? " (Removed)" : ""}</Text>
            </Text>
          </TouchableOpacity>
          {!params.intercoluctor.is_removed && (
            <TouchableOpacity>
              <Text onPress={goToDealerAds} style={VIEW_ADS_BTN}>
                {t("chat.from")}{" "}
                {params.intercoluctor.full_name}{" "}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Chat fetchMore={fetchMore} data={messages} />
      </Body>
      <Footer styles={{ ...FOOTER, ...(params.intercoluctor.is_removed ? DISABLED : {}) }}>
        <ChatForm
          onSubmit={sendMessage}
          disabled={params.intercoluctor.is_removed}
          message={text}
          media={media}
          setMedia={setMedia}
          setMessage={setText}
        />
      </Footer>
    </Screen>
  )
}
