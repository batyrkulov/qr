import { useNavigation } from "@react-navigation/native"
import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import {
  Body,
  Footer,
  GradientButton,
  Header,
  MediaInput,
  Notice,
  Screen,
  Text,
} from "../../../components"
import { PostStack } from "../../../navigators/constans"
import { IMedia } from '../../../store/ducks/newPost/types'
import { setTradingOption } from "../../../store/ducks/newTrading/actions"
import { RootState } from "../../../store/rootReducer"
import { BODY, NOTICE, PARAGRAPH } from "./styles"

export const AddMediaTrading = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const selectedImages = useSelector((state: RootState) => state.newTrading.post.media_files)
  const [error, setError] = useState(null)
  const hasPrimary = useMemo(() => !!selectedImages.filter((img) => img.is_primary).length, [
    selectedImages,
  ])
  const handleNext = () => {
    if (hasPrimary) {
      navigation.navigate(PostStack.extraInfo, {isTrading: true})
    } else {
      setError("Add a primary image ")
    }
  }

  const onChange = (images: IMedia[]) => {
    setError(null)
    dispatch(
      setTradingOption({
        option: "media_files",
        value: images,
      }),
    )
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <Screen preset="scroll">
      <Header onLeftPress={goBack} leftIcon="back" title={t("media.title")} />
      <Body containerStyles={BODY} withBackGroundImage>
        <Notice styles={NOTICE}>
          <Text style={!!t("notices.media.p2") && PARAGRAPH} preset="input">
            {t("notices.media.p1")}
          </Text>
          {!!t("notices.media.p2") && <Text preset="input">{t("notices.media.p2")}</Text>}
        </Notice>
        <MediaInput
          hasPrimary={hasPrimary}
          error={error}
          value={selectedImages}
          onChange={onChange}
        />
      </Body>
      <Footer>
        <GradientButton onPress={handleNext} text={t("common.nextStep")} />
      </Footer>
    </Screen>
  )
}
