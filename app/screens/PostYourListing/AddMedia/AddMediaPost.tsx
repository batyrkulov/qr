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
import { selectMainCategory, selectSubCategory } from "../../../store/ducks/category/selectors"
import { setPostOption } from "../../../store/ducks/newPost/actions"
import { IMedia } from "../../../store/ducks/newPost/types"
import { RootState } from "../../../store/rootReducer"
import { BODY, NOTICE, PARAGRAPH } from "./styles"

export const AddMediaPost = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const mainCategory = useSelector(selectMainCategory)
  const subCategory = useSelector(selectSubCategory)
  const selectedImages = useSelector((state: RootState) => state.newPost.post.media_files)

  const [error, setError] = useState(null)
  const hasPrimary = useMemo(() => !!selectedImages.filter((img) => img.is_primary).length, [
    selectedImages,
  ])
  const handleNext = () => {
    if (hasPrimary) {
      if (
        mainCategory.id === 6 ||
        mainCategory.id === 7 ||
        subCategory.id === 21 ||
        subCategory.id === 23 ||
        subCategory.id === 25
      ) {
        navigation.navigate(PostStack.plan)
      } else {
        navigation.navigate(PostStack.extraInfo)
      }
    } else {
      setError("Add a primary image ")
    }
  }


  const onChange = (images: IMedia[]) => {
    setError(null)
    dispatch(
      setPostOption({
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
