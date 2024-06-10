import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { ViewStyle } from "react-native"

import { Picker, RadioOption } from "../../../../components"

const CONTAINER_STYLE: ViewStyle = {
  marginTop: 16,
}

type FilterBlockType = {
  selectedFilter: string
  items: RadioOption[]
  setSelectedFilter: (value: string) => void
}

const Component = ({
  setSelectedFilter,
  items,
  selectedFilter,
}: FilterBlockType): React.ReactElement => {
  const { t } = useTranslation()

  const onSelectListing = useCallback(
    (value) => {
      setSelectedFilter(value.value)
    },
    [setSelectedFilter],
  )

  return (
    <>
      <Picker
        containerStyle={CONTAINER_STYLE}
        value={selectedFilter}
        modalTitle={t("myListings.title")}
        onChange={onSelectListing}
        items={items}
      />
    </>
  )
}
export const FilterBlock = React.memo(Component)
