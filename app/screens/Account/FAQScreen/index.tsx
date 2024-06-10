import { useNavigation } from "@react-navigation/native"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, TouchableOpacity, View } from "react-native"

import { getFAQ, IFAQ } from "../../../api/profile"
import { ROTATE_RTL_180 } from "../../../common_styles"
import { Body, Header, Screen, Text } from "../../../components"
import { ArrowRightIcon } from "../../../components/icons"
import { AccountStack } from "../../../navigators/constans"
import { ITEM_WRAPPER, SEPARATOR } from "./styles"

const Component = () => {
  const { goBack, navigate } = useNavigation()
  const { t } = useTranslation()
  const [categories, setCategories] = useState<IFAQ[]>([])
  useEffect(() => {
    getFAQ().then(({ data }) => setCategories(data))
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: IFAQ }) => {
      return (
        <TouchableOpacity
          style={ITEM_WRAPPER}
          onPress={() =>
            navigate(AccountStack.askedQuestionsScreen, {
              questions: item.frequently_asked_question,
              title: item.frequently_asked_question_category_translation.name,
            })
          }
        >
          <Text text={item.frequently_asked_question_category_translation.name} />
          <ArrowRightIcon style={ROTATE_RTL_180} />
        </TouchableOpacity>
      )
    },
    [navigate],
  )

  const keyExtractor = useCallback((item) => item.title, [])
  const separator = useCallback(() => <View style={SEPARATOR} />, [])

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} onLeftPress={goBack} title={t("support.faq")} />
      <Body withBackGroundImage>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separator}
        />
      </Body>
    </Screen>
  )
}
export const FAQ = React.memo(Component)
