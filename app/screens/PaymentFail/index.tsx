import React, { FC } from "react"

import { Body, GradientButton, Text } from "../../components"
import { PaymentFailIcon } from "../../components/icons/PaymentFail"
import { BODY, BTN } from "../NoInternet/styles"
import { TEXT } from "./styles"

interface IProps {
  error: string;
  onDismiss: () => void;
}

export const PaymentFailScreen: FC<IProps> = ({
  error,
  onDismiss,
}) => {
  return (
    <Body containerStyles={BODY} withBackGroundImage>
      <PaymentFailIcon />
      <Text style={TEXT}>{error}.</Text>
      <GradientButton onPress={onDismiss} style={BTN} text="Try Again" />
    </Body>
  )
}
