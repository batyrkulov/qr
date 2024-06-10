import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { Body, Footer, GradientButton, Icon, Screen, Text } from "../../components"
import { BTN_TEXT } from "../../components/gradient-button/styles"
import { PrimaryParamList } from '../../navigators/app-navigator'
import { AppStack, BottomTabStack } from "../../navigators/constans"
import { BODY, BUTTON, ICON, SUBTITLE, TITLE } from "./styles"

type SuccessScreenRouteProp = RouteProp<PrimaryParamList, AppStack.success>

interface IProps {
  onDismiss?: () => void;
}

export const SuccessScreen: React.FC<IProps> = ({
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { params } = useRoute<SuccessScreenRouteProp>()
  const navigation = useNavigation()
  const goToHome = () => {
    if (onDismiss) onDismiss();

    navigation.dispatch(
      StackActions.replace(AppStack.bottomTabStack, { screen: BottomTabStack.homeStack }),
    )
  }
  return (
    <Screen>
      <Body withBackGroundImage containerStyles={BODY}>
        <Text style={TITLE} preset="header">
          {t("success.title")}
        </Text>
        <Text style={SUBTITLE} preset="subheader">
          {params?.isTrading ? t("success.trading") : t("success.subtitle")}
        </Text>
        <Icon icon="bigLogo" />
      </Body>
      <Footer>
        <GradientButton onPress={goToHome}>
          <View style={BUTTON}>
            <Icon style={ICON} icon="search" />
            <Text style={BTN_TEXT}>{t("common.backToHome")}</Text>
          </View>
        </GradientButton>
      </Footer>
    </Screen>
  )
}
