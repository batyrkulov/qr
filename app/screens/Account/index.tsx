import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import {
  Body,
  GradientButton,
  MyAccountFooter,
  MyAccountHeader,
  MyAccountMenu,
  MyAccountUserInfo,
  Screen,
  SupportModal,
  Text,
} from "../../components"
import { EditIcon } from "../../components/icons"
import { PrimaryParamList as AccountParamList } from "../../navigators/account-navigator"
import { PrimaryParamList as AppParamList } from "../../navigators/app-navigator"
import { AccountStack, AppStack } from "../../navigators/constans"
import { CONTENT_EDIT_BTN_WRAPPER, EDIT_BTN, EDIT_PROFILE_TEXT } from "./styles"

type ProfileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountParamList, AccountStack.accountScreen>,
  StackNavigationProp<AppParamList>
>
const Component = (): React.ReactElement => {
  const { navigate } = useNavigation<ProfileScreenNavigationProp>()
  const { t } = useTranslation()

  // const [isShowCreditsModal, setIsShowCreditsModal] = useState(false)
  const [isShowSupportModal, setIsShowSupportModal] = useState(false)

  // const closeCreditsModal = useCallback(() => {
  //   setIsShowCreditsModal(false)
  // }, [])
  const openEditProfile = useCallback(() => {
    navigate(AppStack.profile, { isEdit: true })
  }, [navigate])

  const openSupportModal = useCallback(() => setIsShowSupportModal(true), [])
  const closeSupportModal = useCallback(() => setIsShowSupportModal(false), [])

  return (
    <Screen preset={"fixed"}>
      <Body withBackGroundImage>
        {/* <ChooseCreditsModal isVisible={isShowCreditsModal} closeModal={closeCreditsModal} />temporarily hidden */}
        <MyAccountHeader />
        <MyAccountUserInfo />
        <GradientButton style={EDIT_BTN} onPress={openEditProfile}>
          <View style={CONTENT_EDIT_BTN_WRAPPER}>
            <EditIcon />
            <Text text={t("myAccount.editProfile")} style={EDIT_PROFILE_TEXT} />
          </View>
        </GradientButton>
        <MyAccountMenu />
        <MyAccountFooter onPressSupport={openSupportModal} />
        <SupportModal isVisible={isShowSupportModal} closeModal={closeSupportModal} />
      </Body>
    </Screen>
  )
}

export const Account = React.memo(Component)
