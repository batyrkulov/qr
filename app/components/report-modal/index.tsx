import React, { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { TextInput, View } from "react-native"
import { ModalProps } from "react-native-modal"

import { sendReport } from "../../api/post"
import { MARGIN_BOTTOM } from "../../common_styles"
import { Modal } from ".."
import { Text } from "../text/text"
import { CONTAINER, INNER, TEXTAREA } from "./styles"

type ReportModalProps = {
  id: number | string
} & Partial<ModalProps>

export const ReportModal: FC<ReportModalProps> = ({ id, ...rest }) => {
  const [text, setText] = useState("")
  const { t } = useTranslation()
  const send = () => {
    sendReport({post_id: id, text}).then(() => rest.onDismiss())
  }
  return (
    <Modal
      {...rest}
      title={t("productScreen.report")}
      submitLabel={t("modal.send")}
      onSubmit={send}
    >
      <View style={[INNER, CONTAINER]}>
        <Text style={MARGIN_BOTTOM(4)} preset="secondary">
          {t("textFields.report")}
        </Text>
        <TextInput
          multiline
          numberOfLines={10}
          placeholder={t("textFields.reportPlaceholder")}
          style={TEXTAREA}
          onChangeText={setText}
          value={text}
        />
      </View>
    </Modal>
  )
}
