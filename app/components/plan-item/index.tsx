import React, { FC, useMemo } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button"

import { Plan, PlanItem } from "../../api/post"
import { ROW, ROW_NO_RTL } from "../../common_styles"
import { color } from "../../theme"
import { Text } from ".."
import { RadioProps } from "../radio_button"
import {
  BUTTON,
  CONTAINER,
  FEATURE,
  ICON,
  LABEL,
  LABEL_ACTIVE,
  LABEL_WRAPPER,
  PRICE,
  RADIO,
} from "./styles"

type PlanItemProps = {
  price: number
  payment_plan_plan_item: PlanItem[]
} & RadioProps &
  Plan

export const PlanListItem: FC<PlanItemProps> = ({
  isActive,
  onPress,
  options,
  payment_plan_plan_item,
  price,
  payment_plan_plan_label,
  icon_url,
}) => {
  const containerStyles = useMemo(() => CONTAINER(isActive), [isActive])
  const labelStyleBackground = (color: string) => ({ backgroundColor: color })
  return (
    <TouchableOpacity onPress={() => onPress(options.value)} style={containerStyles}>
      <RadioButton labelHorizontal>
        <View style={RADIO}>
          <RadioButtonInput
            buttonColor={!isActive ? color.placeholder : color.blue}
            buttonOuterSize={14}
            buttonSize={8}
            buttonStyle={BUTTON}
            onPress={onPress}
            obj={options}
            isSelected={isActive}
          />
          <View>
            <View style={ROW_NO_RTL}>
              <Image style={ICON} source={{ uri: icon_url }} />
              <RadioButtonLabel
                labelStyle={isActive ? LABEL_ACTIVE : LABEL}
                onPress={onPress}
                obj={options}
                isSelected={isActive}
                labelWrapStyle={LABEL_WRAPPER}
              />
              <View style={ROW}>
                {payment_plan_plan_label.map((label) => (
                  <Text
                    key={label.id}
                    style={[FEATURE, labelStyleBackground(label.plan_label.background_color)]}
                  >
                    {label.plan_label.plan_label_translation.name}
                  </Text>
                ))}
              </View>
            </View>
            <View>
              {payment_plan_plan_item.map((item) => (
                <Text preset="input" key={item.id}>
                  • {item.plan_item.plan_item_translation.name}{" "}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <Text style={PRICE}>{price ? price + " KD" : "Free"}</Text>
      </RadioButton>
    </TouchableOpacity>
  )
}
