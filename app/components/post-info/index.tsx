import { FC } from "hoist-non-react-statics/node_modules/@types/react"
import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { I18nManager, Image, ImageStyle, StyleProp, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

import { numberWithCommas } from "../../utils/numberWithCommas"
import { IDetailedPost } from "../../api/post"
import { MARGIN_BOTTOM, ROW_NO_RTL, WRAP } from "../../common_styles"
import { selectOptionsTranslations } from "../../store/ducks/meta/selectors"
import { IOptionWithTranslation } from "../../store/ducks/meta/types"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"
import { BTN, BTN_TEXT, FEATURE_ICON, FEATURES_CONTAINER, ITEM, ROOT } from "./styles"

const extraInfoKeys = [
  {
    key: "model",
    label: "Model",
    label_ar: "موديل",
  },
  {
    key: "year",
    label: "Year",
    label_ar: "ﺳﻨﺔ اﻟﺼﻨﻊ",
  },
  {
    key: "mileage",
    label: "Kilometer",
    label_ar: "العداد",
  },
  {
    key: "color_exterior",
    label: "Color Exterior",
    label_ar: "اﻟﻠﻮن اﻟﺨﺎرﺟﻲ",
  },
  {
    key: "color_interior",
    label: "Color Interior",
    label_ar: "أسود",
  },
  {
    key: "transmission",
    label: "Transmission",
    label_ar: "ﻧﺎﻗﻞ اﻟﺤﺮﻛﺔ",
  },
  {
    key: "import_country",
    label: "Import",
    label_ar: "وارد",
  },
  {
    key: "body_type",
    label: "Body Type",
    label_ar: "ﻧﻮع ",
  },
  {
    key: "cylinders",
    label: "Cylinders",
    label_ar: "الاسطوانات",
  },
  {
    key: "condition",
    label: "Condition",
    label_ar: "الحالة",
  },
  {
    key: "fuel_type",
    label: "Fuel Type",
    label_ar: "ﻧﻮع اﻟﻮﻗﻮد",
  },
  {
    key: "seats_material",
    label: "Seats material",
    label_ar: "المقاعد",
  },
  {
    key: "hours",
    label: "Hours",
    label_ar: "ساعة",
  },
]

type PostInfoProps = {
  data: IDetailedPost
}

const getOptionName = (
  translations: IOptionWithTranslation[],
  id: number | string,
  option?: string,
) => {
  if (option === "mileage" || option === "year" || option === "hours") {
    return id
  }
  return translations.find((t) => t.id === id)?.item_description.name
}
const getOption = (translations: IOptionWithTranslation[], id) => {
  return translations.find((t) => t.id === id)
}

export const PostInfo: FC<PostInfoProps> = ({ data }) => {
  const { t } = useTranslation()
  const translations = useSelector(selectOptionsTranslations)

  const [isAllInfo, setIsAllInfo] = useState(false)
  const activeExtraInfoKeys = useMemo(() => {
    let result = [
      ...extraInfoKeys.map((item) => ({
        ...item,
        value:
          data[item.key]?.name ||
          getOptionName(translations, data[item.key], item.key) ||
          data[item.key],
      })),
    ]
      .filter((res) => res.value)
      .map((item) => {
        if (item.key === "mileage") {
          return {
            ...item,
            value: numberWithCommas(item.value || 0),
          }
        }
        return item
      })

    if (!isAllInfo) {
      result = result.slice(0, 6)
    }

    return result
  }, [data, isAllInfo, translations])

  const toggleAllInfo = () => {
    setIsAllInfo(!isAllInfo)
  }

  const ICON: StyleProp<ImageStyle> = isAllInfo ? { transform: [{ rotateX: "180deg" }] } : {}

  if (!activeExtraInfoKeys.length) {
    return null
  }
  return (
    <View style={ROOT}>
      <View style={[ROW_NO_RTL, WRAP, MARGIN_BOTTOM(4)]}>
        {activeExtraInfoKeys.map(({ key, label, label_ar, value }) => {
          return (
            <View style={ITEM} key={key}>
              <Info label={I18nManager.isRTL ? label_ar : label} value={value} />
            </View>
          )
        })}
      </View>
      {isAllInfo && (
        <>
          {!!data.more_features.length && (
            <View style={FEATURES_CONTAINER}>
              <Text style={MARGIN_BOTTOM(10)} preset="placeholder">
                Features
              </Text>
              <View style={[ROW_NO_RTL, WRAP]}>
                {data.more_features.map((id) => {
                  const option = getOption(translations, id)
                  return (
                    <View key={id} style={ROW_NO_RTL}>
                      <Image source={{ uri: option?.image_url }} style={FEATURE_ICON} />
                      <Text preset="secondary">{option?.item_description.name}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
          {!!data.additional_features.length && (
            <View style={FEATURES_CONTAINER}>
              <Text style={MARGIN_BOTTOM(10)} preset="placeholder">
                Additional Features
              </Text>
              <View style={[ROW_NO_RTL, WRAP]}>
                {data.additional_features.map((id) => (
                  <View key={id} style={ROW_NO_RTL}>
                    <Icon style={FEATURE_ICON} icon="checkbox" />
                    <Text preset="secondary">{getOptionName(translations, id)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </>
      )}
      <TouchableOpacity onPress={toggleAllInfo} style={[ROW_NO_RTL, BTN]}>
        <Text style={BTN_TEXT}>
          {isAllInfo ? t("productScreen.lessInfo") : t("productScreen.moreInfo")}
        </Text>
        <Icon style={ICON} icon="arrowDown" />
      </TouchableOpacity>
    </View>
  )
}

type InfoProps = {
  label: string
  value: string
}

const Info: FC<InfoProps> = ({ label, value }) => {
  return (
    <View>
      <Text style={MARGIN_BOTTOM(4)} preset="secondary">
        {label}
      </Text>
      <Text>{value}</Text>
    </View>
  )
}
