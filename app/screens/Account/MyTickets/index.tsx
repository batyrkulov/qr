import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, View } from "react-native"

import { getTickets, Ticket } from "../../../api/profile"
import { Body, Footer, GradientButton, Header, Screen, Text } from "../../../components"
import { ITEM_TEXT, ITEM_WRAPPER } from "./styles"

const DATA = [
  { text: "What should I do in case when the cull", date: "03/02/2021" },
  { text: "Hi, how can I register my second acco", date: "03/12/2021" },
  { text: "What should I do in case when the cu", date: "02/24/2021" },
  { text: "Hi, how can I register my second acco", date: "01/01/2021" },
]

const Component = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    getTickets()
      .then(({ data }) => setTickets(data))
      .catch(console.log)
  }, [])

  const renderItem = useCallback(({ item }: { item: Ticket }) => {
    return (
      <View style={ITEM_WRAPPER}>
        <Text text={item.subject} numberOfLines={1} style={ITEM_TEXT} />
        <Text text={moment(item.created_at).format("DD/MM/YYYY")} preset={"fieldLabel"} />
      </View>
    )
  }, [])
  const keyExtractor = useCallback((item, index) => `${item}-${index}`, [])
  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} onLeftPress={goBack} title={t("support.myTickets")} />
      <Body withBackGroundImage>
        <FlatList
          data={tickets}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Body>
      <Footer>
        <GradientButton onPress={goBack} text={t("support.createTicket")} />
      </Footer>
    </Screen>
  )
}
export const MyTickets = React.memo(Component)
