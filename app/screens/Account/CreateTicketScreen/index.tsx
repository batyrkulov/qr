import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native"

import { sendTicket } from "../../../api/profile"
import { MARGIN_BOTTOM } from "../../../common_styles"
import {
  Body,
  Footer,
  GradientButton,
  Header,
  Input,
  Modal,
  Screen,
  Text,
} from "../../../components"
import { AppStack } from "../../../navigators/constans"
import { useMixpanel } from "../../../providers/mixpanel"
import { Patterns } from "../../../utils/validate"
import { DESCRIPTION_FIELD, STATUS_MODAL_TEXT } from "./styles"

export type CreateTicketFieldsType = {
  sender_email: string
  subject: string
  message: string
}
type StatusModalType = {
  isVisible: boolean
  closeModal: () => void
}
// eslint-disable-next-line react/display-name
const StatusModal = React.memo(({ isVisible, closeModal }: StatusModalType) => {
  const { t } = useTranslation()

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={closeModal}
      submitLabel={t("support.done")}
      onSubmit={closeModal}
      title={t("support.success")}
      modalHeight={200}
      isHideCloseBtn
    >
      <Text text={t("support.successMessage")} style={STATUS_MODAL_TEXT} />
    </Modal>
  )
})

const Component = () => {
  const { goBack, navigate } = useNavigation()
  const { t } = useTranslation()
  const mixpanel = useMixpanel()
  const [isVisibleStatusModal, setIsStatusModal] = useState(false)
  const closeStatusModal = useCallback(() => {
    setIsStatusModal(false)
    goBack()
  }, [goBack])
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketFieldsType>()

  const onSubmit = (data) => {
    sendTicket(data)
      .then(() => {
        mixpanel.track("Contacted support")
      })
      .finally(() => setIsStatusModal(true))
  }

  const openMyTickets = useCallback(() => {
    navigate(AppStack.myTicketsScreen)
  }, [navigate])

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} onLeftPress={goBack} title={t("support.createTicket")} />
      <StatusModal isVisible={isVisibleStatusModal} closeModal={closeStatusModal} />
      <Body withBackGroundImage>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Controller
            name="sender_email"
            control={control}
            rules={{
              required: { message: "This feild is mandatory **", value: true },
              pattern: { message: "Email is not valid", value: Patterns.email },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.sender_email}
                autoCapitalize="none"
                value={value}
                keyboardType="email-address"
                style={MARGIN_BOTTOM(16)}
                onChangeText={onChange}
                label={t("support.emailAddress")}
                placeholder={t("support.enterEmail")}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            rules={{
              required: { message: "This feild is mandatory **", value: true },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.subject}
                value={value}
                style={MARGIN_BOTTOM(16)}
                onChangeText={onChange}
                label={t("support.title")}
                placeholder={t("support.enterTitle")}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{
              required: { message: "This feild is mandatory **", value: true },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                error={errors.message}
                value={value}
                style={MARGIN_BOTTOM(16)}
                onChangeText={onChange}
                label={t("support.description")}
                placeholder={t("support.enterDescription")}
                multiline={true}
                numberOfLines={3}
                inputStyle={DESCRIPTION_FIELD}
              />
            )}
          />
        </ScrollView>
        {/* <TouchableOpacity style={MY_TICKET_BTN} onPress={openMyTickets}>
          <Text text={t("support.myTickets")} style={MY_TICKET_TEXT} />
        </TouchableOpacity> */}
      </Body>
      <Footer>
        <GradientButton onPress={handleSubmit(onSubmit)} text={t("support.send")} />
      </Footer>
    </Screen>
  )
}
export const CreateTicket = React.memo(Component)
