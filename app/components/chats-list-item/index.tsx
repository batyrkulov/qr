import moment from "moment"
import React, { FC, useMemo } from "react"
import { I18nManager, Image, View } from "react-native"
import { useSelector } from "react-redux"

import { ChatData } from "../../api/chats"
import { COLOR, FLEX, ROW } from "../../common_styles"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { selectUser } from "../../store/ducks/profile/selectors"
import { Text } from "../text/text"
import { AVATAR, TIME } from "./styles"

export const ChatsListItem: FC<{ chat: ChatData }> = ({ chat }) => {
  const user = useSelector(selectUser)
  const lastMessageTime = useMemo(() => moment(chat.message.created_at).format("HH:MM"), [chat])
  const intercoluctor = useMemo(() => chat.participant.find((p) => p.user.id !== user.id), [
    chat.participant,
    user.id,
  ])
  const fromText = useMemo(
    () => (chat.message.user.is_current_user ? "You" : chat.message.user.full_name),
    [chat],
  )

  const messageStyle = { lineHeight: 24 }

  return (
    <View style={ROW}>
      <Image
        style={AVATAR}
        source={
          intercoluctor.user.avatar?.url
            ? { uri: intercoluctor.user.avatar?.url }
            : require("../icons/noavatar.png")
        }
      />
      <View style={FLEX(1)}>
        <View style={ROW}>
          <Text style={[!I18nManager.isRTL && FLEX(1), COLOR("#0892F9")]} preset="inputBold">
            {intercoluctor.user.full_name}
          </Text>
          <Text style={[I18nManager.isRTL && FLEX(1), TIME]} preset="secondary">
            {lastMessageTime}
          </Text>
        </View>
        <View style={ROW}>
          <Text style={!I18nManager.isRTL && MARGIN_RIGHT(10)} preset="secondary">
            {fromText}:
          </Text>
          <Text style={[I18nManager.isRTL && MARGIN_RIGHT(10), messageStyle]} preset="input">
            {chat.message.text ? chat.message.text : chat.message.message_file.length + " assets"}
          </Text>
        </View>
      </View>
    </View>
  )
}
