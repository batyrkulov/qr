import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import RNModal, { ModalProps as RNModalProps } from "react-native-modal"

import { Text } from "../text/text"
import { CONTAINER, HEADER, MODAL, MODAL_CONTROLS, OPACITY_0 } from "./styles"

type ModalProps = {
  submitLabel: string
  onSubmit: (v: any) => void
  title: string
  modalHeight?: number
  containerStyle?: ViewStyle
  isHideCloseBtn?: boolean
} & Partial<RNModalProps>

export const Modal: FC<ModalProps> = ({
  children,
  modalHeight,
  title,
  submitLabel,
  onSubmit,
  containerStyle,
  isHideCloseBtn,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <RNModal
      {...rest}
      swipeDirection={["down"]}
      scrollOffsetMax={400 - 300} // content height - ScrollView height
      propagateSwipe={true}
      style={MODAL}
    >
      <View style={[CONTAINER, modalHeight && { height: modalHeight }, containerStyle]}>
        <View style={HEADER}>
          <TouchableOpacity
            onPress={rest.onDismiss}
            disabled={isHideCloseBtn}
            style={isHideCloseBtn && OPACITY_0}
          >
            <Text style={MODAL_CONTROLS}>{t("modal.cancel")}</Text>
          </TouchableOpacity>
          <Text preset="header2">{title}</Text>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={MODAL_CONTROLS}>{submitLabel}</Text>
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </RNModal>
  )
}
