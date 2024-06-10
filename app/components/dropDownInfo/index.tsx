import React, { useCallback, useState } from "react"
import { TouchableOpacity, View } from "react-native"

import { color } from "../../theme"
import { ArrowRightIcon } from "../icons"
import { Text } from "../text/text"
import { DARK_TEXT, ROTATE_90, ROTATE_270, ROW, TEXT, TITLE, WRAPPER } from "./styles"

type DropDownInfoType = {
  title: string
  description: string
}
const Component = ({ title, description }: DropDownInfoType): React.ReactElement => {
  const [isShow, setIsShow] = useState(false)

  const switcher = useCallback(() => setIsShow((prev) => !prev), [])

  return (
    <TouchableOpacity style={WRAPPER} onPress={switcher} activeOpacity={1}>
      <View style={ROW}>
        <Text text={title} style={[TITLE, !isShow && DARK_TEXT]} />
        <ArrowRightIcon
          strokeColor={isShow ? color.blue : color.palette.fountainBlue}
          style={isShow ? ROTATE_270 : ROTATE_90}
          height={11}
          width={6}
          strokeWidth={3}
        />
      </View>
      {isShow && <Text text={description} style={TEXT} />}
    </TouchableOpacity>
  )
}
export const DropDownInfo = React.memo(Component)
