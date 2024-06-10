import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, View } from "react-native"

import { FAQInfo } from "../../../api/profile"
import { MARGIN_BOTTOM } from "../../../common_styles"
import { Body, Header, Input, Screen } from "../../../components"
import { DropDownInfo } from "../../../components/dropDownInfo"
import { SearchIcon } from "../../../components/icons"
import { PrimaryParamList } from "../../../navigators/account-navigator"
import { AccountStack } from "../../../navigators/constans"
import { SEARCH_ICON } from "../FAQScreen/styles"
import { SEPARATOR } from "./styles"

type AskedQuestionsScreenRouteProp = RouteProp<PrimaryParamList, AccountStack.askedQuestionsScreen>

const Component = () => {
  const { params } = useRoute<AskedQuestionsScreenRouteProp>()
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState("")
  const filteredQuestions = useMemo(() => {
    return params.questions
      .filter(
        (q) =>
          q.frequently_asked_question_translation.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
          q.frequently_asked_question_translation.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
      )
      .map((item) => item.frequently_asked_question_translation)
  }, [params.questions, searchText])

  const extraIcon = useCallback(() => <SearchIcon style={SEARCH_ICON} />, [])

  const renderItem = useCallback(
    ({ item }: { item: FAQInfo }) => (
      <DropDownInfo description={item.description} title={item.title} />
    ),
    [],
  )
  const keyExtractor = useCallback((item) => item.title, [])

  const separator = useCallback(() => <View style={SEPARATOR} />, [])

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon={"back"} onLeftPress={goBack} title={params.title} />
      <Body withBackGroundImage>
        <Input
          value={searchText}
          style={MARGIN_BOTTOM(16)}
          onChangeText={setSearchText}
          label={t("support.searchQuestion")}
          placeholder={t("support.search")}
          extraIcon={extraIcon}
        />
        <FlatList
          data={filteredQuestions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separator}
        />
      </Body>
    </Screen>
  )
}
export const AskedQuestions = React.memo(Component)
