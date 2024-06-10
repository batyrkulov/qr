import { useNavigation } from "@react-navigation/native"
import React, { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { useDispatch, useSelector } from "react-redux"

import { fetchAreas, fetchDistricts } from "../../../api/locations"
import {
  Body,
  Footer,
  GradientButton,
  Header,
  Picker,
  RadioOption,
  Screen,
  Switch,
  Text,
} from "../../../components"
import { PostStack } from "../../../navigators/constans"
import { setSelectedArea, setSelectedDistrict } from "../../../store/ducks/location/actions"
import { selectSelectedArea, selectSelectedDistrict } from "../../../store/ducks/location/selectors"
import { setPostOption } from "../../../store/ducks/newPost/actions"
import { RootState } from "../../../store/rootReducer"
import { PICKER, SWITCH_CONTAINER } from "./styles"

export const LocationScreen: FC = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const isShare = useSelector((state: RootState) => state.newPost.post.is_share_location)
  const [districs, setDistrics] = useState<RadioOption[]>([])
  const [areas, setAreas] = useState<RadioOption[]>([])

  const setIsShare = (value: boolean) => {
    dispatch(setPostOption({ option: "is_share_location", value }))
  }

  useEffect(() => {
    fetchDistricts(1).then(({ data }) => {
      setDistrics(data.map((d) => ({ label: d.name, value: d.id })))
    })
  }, [])

  const selectedDistrict = useSelector(selectSelectedDistrict)

  const selectedArea = useSelector(selectSelectedArea)

  const setDistrict = (distric: RadioOption) => {
    dispatch(setSelectedDistrict(distric?.label || null))
    fetchAreas(distric.value).then(({ data }) => {
      setAreas(data.map((a) => ({ label: a.name, value: a.id })))
    })
    setArea(null)
  }
  const setArea = (area: RadioOption) => {
    dispatch(setPostOption({ option: "area_id", value: area?.value || null }))
    dispatch(setSelectedArea(area?.label || null))
  }

  const goBack = () => {
    navigation.goBack()
  }

  const handleNext = () => {
    if (selectedArea) {
      navigation.navigate(PostStack.media)
    } else {
      toast.show("Choose location", {
        placement: "top",
      })
    }
  }

  return (
    <Screen>
      <Header title={t("location.title")} onLeftPress={goBack} leftIcon="back" />
      <Body withBackGroundImage>
        <Picker
          containerStyle={PICKER}
          value={selectedDistrict}
          modalTitle={t("textFields.districtPlaceholder")}
          onChange={setDistrict}
          items={districs}
          placeholder={t("textFields.districtPlaceholder")}
          label={t("textFields.district")}
        />
        <Picker
          disabled={!selectedDistrict}
          value={selectedArea}
          modalTitle={t("textFields.areaPlaceholder")}
          onChange={setArea}
          items={areas}
          placeholder={t("textFields.areaPlaceholder")}
          label={t("textFields.area")}
        />
        <View style={SWITCH_CONTAINER}>
          <Text preset="input">{t("location.share")}</Text>
          <Switch onToggle={setIsShare} value={isShare} />
        </View>
      </Body>
      <Footer>
        <GradientButton onPress={handleNext} text={t("common.nextStep")} />
      </Footer>
    </Screen>
  )
}
