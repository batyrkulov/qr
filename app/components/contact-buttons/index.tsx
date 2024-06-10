import { useNavigation } from "@react-navigation/core"
import React, { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Linking, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

import { IDealer } from "../../api/post"
import { ROW_NO_RTL } from "../../common_styles"
import { AppStack, BottomTabStack } from "../../navigators/constans"
import { selectUser } from "../../store/ducks/profile/selectors"
import { Icon } from ".."
import { Text } from "../text/text"
import { BTN, BTN_LABEL, CALL, CHAT, ICON } from "./styles"

export const ContactButtons: FC<{ user: IDealer; specialPhone?: string }> = ({ user, specialPhone }) => {
  const navigation = useNavigation()
  const currentUser = useSelector(selectUser)
  const { t } = useTranslation()
  const phone = useMemo(() => user.phone_code.code + user.phone, [user])
  const call = () => {
    if (phone || specialPhone) {
      Linking.openURL(`tel:${specialPhone ? specialPhone : phone}`)
    }
  }
  const goToChat = () => {
    navigation.navigate(AppStack.bottomTabStack, {
      screen: BottomTabStack.messenger,
      params: { intercoluctor: user },
    })
  }

  if (currentUser?.id === user?.id) {
    return null
  }

  return (
    <View style={ROW_NO_RTL}>
      <TouchableOpacity onPress={call} style={[BTN, CALL]}>
        <Icon style={ICON} icon="phone" />
        <Text style={BTN_LABEL}>{t("contacts.call")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToChat} style={[BTN, CHAT]}>
        <Icon style={ICON} icon="chat" />
        <Text style={BTN_LABEL}>{t("contacts.chat")}</Text>
      </TouchableOpacity>
    </View>
  )
}
