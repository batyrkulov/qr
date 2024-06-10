import React, { FC } from "react"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"

import { ICategory } from "../../store/ducks/category/types"
import { Text } from ".."
import { CONTAINER, ICON, ICON_CONTAINER, LABEL, SELECTED } from "./styles"

type MenuItemProps = {
  item: ICategory
  style: ViewStyle
  onPress: (value: ICategory) => void
  selected: boolean
}

export const MenuItem: FC<MenuItemProps> = ({ item, style, onPress, selected }) => {
  const LocalIcon = item.localIcon
  const styles = { ...CONTAINER, ...style }

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles}>
      <View style={ICON_CONTAINER}>
        {item.icon && <Image style={ICON} source={{ uri: item.icon }} />}
        {item.localIcon && <LocalIcon style={ICON} />}
        {selected && <View style={SELECTED} />}
      </View>
      <Text style={LABEL} preset="input">
        {item.short_name}
      </Text>
    </TouchableOpacity>
  )
}
