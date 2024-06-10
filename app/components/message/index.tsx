import moment from "moment"
import React, { FC, useMemo, useState } from "react"
import { Image, Modal, TouchableOpacity } from "react-native"
import { View } from "react-native-animatable"
import ImageViewer from "react-native-image-zoom-viewer"
import { useSelector } from "react-redux"

import { IMessage } from "../../api/chats"
import { selectUser } from "../../store/ducks/profile/selectors"
import { Text } from "../text/text"
import {
  DATE,
  IMAGE,
  MESSAGE,
  MESSAGE_TEXT,
  RECEIVED_MESSAGE,
  RECEIVED_MESSAGE_TEXT,
  SENT_MESSAGE,
  SENT_MESSAGE_TEXT,
} from "./styles"

export const Message: FC<IMessage> = ({ text, created_at, user, message_file }) => {
  const me = useSelector(selectUser)
  const [isImageModalVisible, setIsImageModalVisible] = useState(false)
  const formattedDate = useMemo(() => moment(created_at).format("HH:mm"), [created_at])
  const messageStyle = user.id !== me.id ? RECEIVED_MESSAGE : SENT_MESSAGE
  const messageTextStyle = user.id !== me.id ? RECEIVED_MESSAGE_TEXT : SENT_MESSAGE_TEXT
  const closeImageModal = () => {
    setIsImageModalVisible(false)
  }
  const openImageModal = () => {
    setIsImageModalVisible(true)
  }
  
  return (
    <View style={[messageStyle, MESSAGE]}>
      <View>
        {!!message_file?.length &&
          message_file.map((f) => (
            <TouchableOpacity key={f.private_file.url} onPress={openImageModal}>
              <Image style={IMAGE} source={{ uri: f.private_file.url }} />
            </TouchableOpacity>
          ))}
        <Text style={[MESSAGE_TEXT, messageTextStyle]}>{text}</Text>
      </View>
      <Text style={[MESSAGE_TEXT, messageTextStyle, DATE]}>{formattedDate}</Text>
      <Modal visible={isImageModalVisible} transparent={true}>
        <ImageViewer
          index={0}
          enableSwipeDown
          imageUrls={message_file.map((f) => ({ url: f.private_file.url }))}
          onSwipeDown={closeImageModal}
        />
      </Modal>
    </View>
  )
}
