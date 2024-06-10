import { useNavigation } from "@react-navigation/native"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

import { AccountStack } from "../../navigators/constans"
import { selectIsShowPayment } from "../../store/ducks/meta/selectors"
import { ArrowRightIcon } from "../icons"
import { Text } from "../text/text"
import { itemOfMenu, ListOfMenu } from "./constant"
import { BLUE_CIRCLE, CONTAINER, ITEM_MENU, ITEM_NAME, LEFT_SIDE, ROTATE_180 } from "./styles"

type MyAccountMenuType = {
  openCreditModal?: (value: boolean) => void
}

const Component = ({ openCreditModal }: MyAccountMenuType): React.ReactElement => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()
  const isShowPayment = useSelector(selectIsShowPayment)

  const onSelectItem = useCallback(
    (routeName?: string, type?: string) => {
      type === "modal" && openCreditModal(true)
      routeName && navigate(routeName)
    },
    [navigate, openCreditModal],
  )

  const renderItem = useCallback(
    ({ item }: { item: itemOfMenu }) => {
      return (
        <TouchableOpacity style={ITEM_MENU} onPress={() => onSelectItem(item.navigate, item.type)}>
          <View style={LEFT_SIDE}>
            <View style={BLUE_CIRCLE}>{item.icon}</View>
            <Text preset={"subheader"} style={ITEM_NAME}>
              {t(item.name)}
            </Text>
          </View>
          {item.isShowArrow && <ArrowRightIcon style={ROTATE_180} />}
        </TouchableOpacity>
      )
    },
    [onSelectItem, t],
  )
  const keyExtractor = useCallback((item) => item.name, [])

  return (
    <FlatList
      style={CONTAINER}
      data={
        isShowPayment
          ? ListOfMenu
          : ListOfMenu.filter((item) => !(item.navigate === AccountStack.paymentsScreen))
      }
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  )
}
export const MyAccountMenu = React.memo(Component)
