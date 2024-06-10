import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"

import { Icon } from ".."
import { IconTypes } from "../icon/icons"
import { Text } from "../text/text"
import { HEADER, ICON, LEFT, LEFT_BTN, RIGHT, RIGHT_ICONS_CONTAINER, RIGHT_TEXT_BTN_CONTAINER,TEXT_BTN_CONTAINER,TITLE } from "./styles"

type HeaderProps = {
  onLeftPress?: () => void
  onRightPress?: () => void
  leftIcon?: IconTypes
  rightIcon?: IconTypes
  title?: string
  rightIcons?: { icon: IconTypes; onPress: () => void }[]
  rightTextButtons?: { text: string, onPress: () => void}[]
}

export const Header: FC<HeaderProps> = ({
  onLeftPress,
  onRightPress,
  leftIcon,
  rightIcon,
  rightIcons,
  title = "",
  rightTextButtons,
}) => {
  return (
    <View style={HEADER}>
      {!!title && (
        <Text preset="header2" style={TITLE}>
          {title}
        </Text>
      )}
      {leftIcon ? (
        <View style={LEFT}>
          <TouchableOpacity style={LEFT_BTN} onPress={onLeftPress}>
            <Icon icon={leftIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={LEFT} />
      )}
      {rightIcon && (
        <View style={RIGHT}>
          <Icon icon={rightIcon} onPress={onRightPress} />
        </View>
      )}
      {rightIcons && (
        <View style={RIGHT_ICONS_CONTAINER}>
          {rightIcons.map(({ icon, onPress }) => (
            <Icon style={ICON} key={icon} icon={icon} onPress={onPress} />
          ))}
        </View>
      )}
      {!rightIcon && !rightIcons && <View style={RIGHT} />}
      {rightTextButtons && (
        <View style={RIGHT_TEXT_BTN_CONTAINER}>
          {rightTextButtons.map(({ text, onPress }) => (
            <TouchableOpacity style={TEXT_BTN_CONTAINER} key={text} onPress={onPress}>
              <Text preset="bold">{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}
