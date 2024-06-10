import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, View } from "react-native"
import { useToast } from "react-native-toast-notifications"

import { getPayments, IPayment } from "../../../api/profile"
import { FLEX } from "../../../common_styles"
import { Body, Header, Screen, Text } from "../../../components"
import { usePagination } from "../../../hooks/usePagination"
import { ITEM_TEXT, ITEM_WRAPPER } from "./styles"

const Component = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const [payments, setPayments] = useState<IPayment[]>([])
  const toast = useToast()

  const fetchPayments = useCallback(
    async (page = 1) => {
      try {
        const { data } = await getPayments(page)
        setPayments((payments) => [...payments, ...data.payments])
        return data
      } catch (error) {
        toast.show(error)
        return error
      }
    },
    [toast],
  )

  const { fetchMore } = usePagination(fetchPayments)

  useEffect(() => {
    fetchMore()
  }, [fetchMore])

  const renderItem = useCallback(({ item }: { item: IPayment }) => {
    console.log(item)
    const date = moment(item.created_at).format("DD/MM/YYYY")
    return (
      <View style={ITEM_WRAPPER}>
        {/*<Text text={'Q8Rider '} numberOfLines={1} style={ITEM_TEXT} />*/}
        <View style={FLEX(4)}>
          <Text text={'ID ' + item.payment_id} style={ITEM_TEXT} />
          <Text>
            <Text text={item.payment_method} style={ITEM_TEXT} />
            <Text text={', ' + item.status + ' '} style={ITEM_TEXT} />
          </Text>
        </View>
        <Text style={FLEX(1)} text={date} preset={"fieldLabel"} />
      </View>
    )
  }, [])
  const keyExtractor = useCallback((item, index) => `${item}-${index}`, [])

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} onLeftPress={goBack} title={t("payments.payments")} />
      <Body withBackGroundImage>
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={fetchMore}
          showsVerticalScrollIndicator={false}
        />
      </Body>
    </Screen>
  )
}
export const Payments = React.memo(Component)
