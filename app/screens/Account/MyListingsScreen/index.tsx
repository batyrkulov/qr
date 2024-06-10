import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { ISwitchSelectorOption } from "react-native-switch-selector"

import { Body, Header, Screen, SwitchSelector } from "../../../components"
import { FilterBlock } from "./blocks/filterBlock"
import { ListOfVehicle } from "./blocks/listOfVehicle"

const Component = (): React.ReactElement => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()

  const options: ISwitchSelectorOption[] = [
    { label: t("myListings.activeList"), value: "active" },
    { label: t("myListings.archivedList"), value: "archivied" },
  ]

  const listings = [
    { label: t("myListings.myListings"), value: t("myListings.myListings") },
    { label: t("myListings.wantedItems"), value: t("myListings.wantedItems") },
  ]

  const [selectedValue, setSelectedValue] = useState<string | number>(options[0].value)
  const [selectedFilter, setSelectedFilter] = useState<string>(listings[0].value)

  return (
    <Screen preset={"fixed"}>
      <Header leftIcon="back" onLeftPress={goBack} title={t("myListings.title")} />
      <Body withBackGroundImage>
        <SwitchSelector
          options={options}
          onPress={setSelectedValue as (value: string | number) => void}
        />
        <FilterBlock
          items={listings}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <ListOfVehicle
          isWanted={selectedFilter === listings[1].value}
          isArchived={selectedValue === options[1].value}
        />
      </Body>
    </Screen>
  )
}
export const MyListings = React.memo(Component)
