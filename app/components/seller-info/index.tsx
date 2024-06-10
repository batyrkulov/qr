import moment from "moment"
import React, { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { I18nManager, Image, ImageStyle, StyleProp, View } from "react-native"

import { IDealer } from "../../api/post"
import { MARGIN_BOTTOM, ROW_NO_RTL } from "../../common_styles"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { ContactButtons } from "../contact-buttons"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"
import { IMAGE } from "./styles"

type SellerInfoProps = {
  data: IDealer
  specialPhone?: string
}

export const SellerInfo: FC<SellerInfoProps> = ({ data, specialPhone }) => {
  const { t } = useTranslation()
  const createdDate = useMemo(
    () =>
      I18nManager.isRTL
        ? moment(data.created_at).format("YYYY")
        : moment(data.created_at).format("MM YYYY"),
    [data.created_at],
  )
  return (
    <View>
      <View style={[ROW_NO_RTL, MARGIN_BOTTOM(16)]}>
        <Image
          style={[MARGIN_RIGHT(10) as ImageStyle, IMAGE]}
          source={data.avatar?.url ? { uri: data.avatar?.url } : require("../icons/noavatar.png")}
        />
        <View>
          <Text style={MARGIN_BOTTOM(8)} preset="header2">
            {data.full_name}
          </Text>
          <Text preset="secondary">{t("productScreen.dealer")}</Text>
        </View>
      </View>
      <View style={MARGIN_BOTTOM(4)}>
        <View style={MARGIN_BOTTOM(12)}>
          <SellerInfoItem text={t("productScreen.member", { date: createdDate })} />
        </View>
        <View style={MARGIN_BOTTOM(12)}>
          {data.is_verified && <SellerInfoItem text={t("productScreen.verifiedDelear")} />}
        </View>
        <View style={MARGIN_BOTTOM(12)}>
          {data.is_profile_filled && <SellerInfoItem text={t("productScreen.verifiedPhone")} />}
        </View>
      </View>

      <View style={MARGIN_BOTTOM(32)}>
        <ContactButtons {...specialPhone && { specialPhone }} user={data} />
      </View>
    </View>
  )
}

type SellerInfoItemProps = {
  text: string
}

const SellerInfoItem: FC<SellerInfoItemProps> = ({ text }) => {
  return (
    <View style={ROW_NO_RTL}>
      <Icon style={MARGIN_RIGHT(10) as StyleProp<ImageStyle>} icon="approve" />
      <Text>{text}</Text>
    </View>
  )
}
