import { Collapse, CollapseBody,CollapseHeader } from "accordion-collapse-react-native"
import React, { FC, useState } from "react"
import { View } from "react-native"

import { Icon } from "../icon/icon"
import { Text } from "../text/text"
import { HEADER, ICON } from "./styles"

type CollapseListProps = {
  title: string
  initialState?: boolean
}

export const CollapseList: FC<CollapseListProps> = ({ children, title, initialState }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initialState)
  return (
    <Collapse isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)}>
      <CollapseHeader>
        <View style={HEADER}>
          <Text>{title}</Text>
          <Icon icon="arrowDown" style={ICON(isExpanded)} />
        </View>
      </CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </Collapse>
  )
}
