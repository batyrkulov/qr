import { useNavigation } from "@react-navigation/native"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Linking, TouchableOpacity, View } from "react-native"
import { useSelector } from 'react-redux'

import { ROTATE_RTL_180 } from "../../common_styles"
import { AccountStack, AppStack } from "../../navigators/constans"
import { selectAppData } from '../../store/ducks/app/selectors'
import { ArrowRightIcon } from "../icons"
import { Modal } from "../modal"
import { Text } from "../text/text"
import { FLAT_LIST, ITEM_TEXT, ITEM_WRAPPER, LIST_CONTAINER, SEPARATOR } from "./styles"

type SupportModalType = {
  isVisible: boolean
  closeModal: () => void
}
type Item = {
  name: string
  isLink: boolean
  screen?: string
}
const DATA: Item[] = [
  { name: "support.agents", isLink: true, screen: AccountStack.agentsScreen },
  { name: "support.createTicket", isLink: true, screen: AppStack.createTicketScreen },
  { name: "support.faq", isLink: true, screen: AccountStack.faqScreen },
  { name: "support.callUs", isLink: false },
]
const Component = ({ isVisible, closeModal }: SupportModalType) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const tel = useSelector(selectAppData)?.phone_number

  const onPressItem = useCallback(
    (value: Item) => {
      if (value.isLink) {
        closeModal()
        navigate(value.screen)
      } else {
        Linking.openURL(`tel:${tel}`)
      }
    },
    [closeModal, navigate, tel],
  )

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity style={ITEM_WRAPPER} onPress={() => onPressItem(item)}>
          <Text text={t(item.name)} style={ITEM_TEXT} />
          {item.isLink && <ArrowRightIcon style={ROTATE_RTL_180} />}
        </TouchableOpacity>
      )
    },
    [onPressItem, t],
  )
  const keyExtractor = useCallback((item) => item.name, [])
  const separator = useCallback(() => <View style={SEPARATOR} />, [])

  return (
    <Modal
      isVisible={isVisible}
      onDismiss={closeModal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      submitLabel={"        "}
      onSubmit={() => null}
      title={t("support.support")}
      modalHeight={370}
    >
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={LIST_CONTAINER}
        showsVerticalScrollIndicator={false}
        style={FLAT_LIST}
        ItemSeparatorComponent={separator}
      />
    </Modal>
  )
}
export const SupportModal = React.memo(Component)
