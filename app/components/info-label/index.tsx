import React, { FC } from 'react'
import { View } from 'react-native'

import { INFO } from './styles'

export const InfoLabel: FC = ({children}) => {
  return (
    <View style={INFO}>{children}</View>
  )
}