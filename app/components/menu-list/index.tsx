import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { ICategory } from "../../store/ducks/category/types"
import { MenuItem } from "../menu-item"
import { CONTAINER, ITEM } from "./styles"

type MenuListProps = {
  items: ICategory[]
  itemStyles?: ViewStyle
  onItemPress?: (value: ICategory) => void
  selectedItem?: string | number | null
}

export const MenuList: FC<MenuListProps> = ({ items, itemStyles, onItemPress, selectedItem }) => {
  return (
    <View style={CONTAINER}>
      {items.map((item, i) => (
        <MenuItem
          selected={selectedItem === item.id}
          onPress={onItemPress}
          key={i}
          item={item}
          style={{ ...ITEM, ...itemStyles }}
        />
      ))}
    </View>
  )
}
