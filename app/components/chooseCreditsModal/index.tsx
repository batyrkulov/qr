import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, TouchableOpacity, View } from "react-native"
import Modal, { ModalProps } from "react-native-modal"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { GradientButton } from "../gradient-button"
import { CheckboxSelectedIcon, CheckboxUnselectedIcon } from "../icons"
import { Text } from "../text/text"
import {
  BOTTOM_TEXT,
  CONTAINER,
  HEADER,
  HIDE,
  INFO_BLOCK,
  ITEM_WRAPPER,
  LIST_CONTAINER,
  LIST_WRAPPER,
  MODAL,
  MODAL_CONTROLS,
  PAY_BTN_WRAPPER,
  PRICE_TEXT,
} from "./styles"

type ChooseCreditsModalType = Partial<Omit<ModalProps, "children">> & {
  closeModal: () => void
}

const CREDIT_LIST = Array(15)
  .fill("*")
  .map((el, index) => (index + 1) * 3)

// eslint-disable-next-line react/display-name
const CreditItem = React.memo(({ item, selectedCredit, setCredit }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity style={ITEM_WRAPPER} onPress={() => setCredit(item)}>
      <View>{item === selectedCredit ? <CheckboxSelectedIcon /> : <CheckboxUnselectedIcon />}</View>
      <View style={INFO_BLOCK}>
        <Text preset="header2">
          {item} {t("myAccount.modal.creditsPackage")}
        </Text>
        <Text preset="secondary" style={BOTTOM_TEXT}>
          {t("myAccount.modal.addToBalance", { item })}
        </Text>
      </View>
      <Text preset="header2" style={PRICE_TEXT}>
        {item}
        {".00 KWD"}
      </Text>
    </TouchableOpacity>
  )
})

const Component = ({ closeModal, ...rest }: ChooseCreditsModalType): React.ReactElement => {
  const { t } = useTranslation()
  const { bottom } = useSafeAreaInsets()

  const [selectedCredit, setSelectedCredit] = useState(3)

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CreditItem selectedCredit={selectedCredit} item={item} setCredit={setSelectedCredit} />
      )
    },
    [selectedCredit],
  )

  const keyExtractor = useCallback((item, index) => `${item}-${index}`, [])
  return (
    <Modal
      swipeDirection={"down"}
      propagateSwipe={true}
      style={MODAL}
      onSwipeComplete={closeModal}
      {...rest}
    >
      <View style={[CONTAINER, { paddingBottom: bottom + 16 }]}>
        <View style={HEADER}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={MODAL_CONTROLS}>{t("modal.cancel")}</Text>
          </TouchableOpacity>
          <Text preset="header2">{t("myAccount.modal.chooseCredits")}</Text>
          <View style={HIDE}>
            <Text style={MODAL_CONTROLS}>{t("modal.cancel")}</Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CREDIT_LIST}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={LIST_WRAPPER}
          contentContainerStyle={LIST_CONTAINER}
        />
        <View style={PAY_BTN_WRAPPER}>
          <GradientButton text={"Pay"} />
        </View>
      </View>
    </Modal>
  )
}
export const ChooseCreditsModal = React.memo(Component)
