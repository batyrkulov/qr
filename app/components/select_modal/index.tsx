import React, { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View } from "react-native"
import { ModalProps } from "react-native-modal"

import { Modal, Radio } from ".."
import { RadioOption } from "../radio_button"
import { ITEM_WRAPPER, SCROLL } from "./styles"

type SelectModalProps = Partial<Omit<ModalProps, "children">> & {
  title: string
  options: RadioOption[]
  onApply: (v: RadioOption) => void
  preselected?: string | number
  modalHeight?: number
}

export const SelectModal: FC<SelectModalProps> = ({
  title,
  options,
  onApply,
  preselected,
  modalHeight,
  ...rest
}) => {
  const { t } = useTranslation()
  const [selectedOption, setSelectedOption] = useState<string | number | null>(preselected ?? null)

  const selectOption = (value: string) => {
    setSelectedOption(value)
  }

  useEffect(() => {
    if (preselected) {
      setSelectedOption(preselected)
    }
  }, [preselected])

  return (
    <Modal
      {...rest}
      modalHeight={modalHeight}
      title={title}
      submitLabel={t("modal.apply")}
      onSubmit={() => {
        const option = options.find((o) => o.value === selectedOption)
        if (option) {
          onApply(option)
        } else {
          onApply(null)
          setSelectedOption(null)
        }
      }}
    >
      <ScrollView style={SCROLL} scrollEventThrottle={16}>
        {options?.map((o) => (
          <View style={ITEM_WRAPPER} key={o.value}>
            {o?.icon && o.icon}
            <Radio
              onPress={selectOption}
              isActive={selectedOption === o.value}
              key={o.value}
              options={o}
            />
          </View>
        ))}
      </ScrollView>
    </Modal>
  )
}
