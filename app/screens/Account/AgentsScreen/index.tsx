import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Linking, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"

import { Agent, getAgents } from "../../../api/profile"
import { Body, GradientButton, Header, Modal, Screen, Text } from "../../../components"
import {
  AGENT_PHOTO,
  AGENT_WRAPPER,
  CONTACT_ITEM,
  CONTACT_ITEM_TEXT,
  HORIZONTAL_LINE,
  NAME_TEXT,
  WRAPPER_CONTACT_ITEM,
} from "./styles"

type ContactModalType = {
  isVisible: boolean
  closeModal: () => void
  agentNumber: string
}

// eslint-disable-next-line react/display-name
const ContactModal = React.memo(({ isVisible, closeModal, agentNumber }: ContactModalType) => {
  const { t } = useTranslation()
  return (
    <Modal
      isVisible={isVisible}
      submitLabel={"          "}
      onSubmit={() => null}
      title={t("support.agent.contact")}
      modalHeight={270}
      onDismiss={closeModal}
      onSwipeComplete={closeModal}
    >
      <View style={WRAPPER_CONTACT_ITEM}>
        <TouchableOpacity
          style={CONTACT_ITEM}
          onPress={() => Linking.openURL(`tel:${agentNumber}`)}
        >
          <Text text={t("support.agent.call")} style={CONTACT_ITEM_TEXT} />
        </TouchableOpacity>
        <View style={HORIZONTAL_LINE} />
        <TouchableOpacity
          style={CONTACT_ITEM}
          onPress={() => Linking.openURL(`sms:${agentNumber}`)}
        >
          <Text text={"SMS"} style={CONTACT_ITEM_TEXT} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
})

const Component = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const [agents, setAgents] = useState<Agent[]>()
  useEffect(() => {
    getAgents().then(({ data }) => setAgents(data))
  }, [])
  const [selectedAgent, setSelectedAgent] = useState<string>()

  const closeModal = useCallback(() => setSelectedAgent(null), [])

  const renderItem = useCallback(
    ({ item }: { item: Agent }) => {
      return (
        <View style={AGENT_WRAPPER}>
          <FastImage source={item.avatar ? { uri: item.avatar.url } : require('../../../components/icons/noavatar.png')} style={AGENT_PHOTO} />
          <Text
            text={item.full_name}
            style={NAME_TEXT}
          />
          <GradientButton
            text={t("support.agent.contact")}
            onPress={() => setSelectedAgent(item.phone_number)}
          />
        </View>
      )
    },
    [t],
  )
  const keyExtractor = useCallback((item, index) => `${item}-${index}`, [])

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} onLeftPress={goBack} title={t("support.agent.agents")} />
      <Body withBackGroundImage>
        <ContactModal
          isVisible={!!selectedAgent}
          closeModal={closeModal}
          agentNumber={selectedAgent}
        />
        <FlatList
          data={agents}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Body>
    </Screen>
  )
}
export const Agents = React.memo(Component)
