import {
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import React, { FC, useMemo, useState } from "react"
import { FieldError } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { getPostDetails } from "../../api/post"
import { Body, Footer, GradientButton, Header, MediaInput, PhotoEditModal,Screen } from "../../components"
import { AppStack } from "../../navigators/constans"
import { setPostOption } from "../../store/ducks/newPost/actions"
import { IMedia } from "../../store/ducks/newPost/types"
import { RootState } from "../../store/rootReducer"
import { color } from "../../theme"
import { BTN,CONTAINER, MEDIA } from "./styles"

type FormErrors = {
  media?: FieldError | null
}

export const PostEditPhotoScreen: FC = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const {
    params: { details },
  } = useRoute()
  const dispatch = useDispatch()

  const selectedImages = useSelector((state: RootState) => state.newPost.post.media_files)

  const [images, setImages] = useState<IMedia[]>(selectedImages)
  const [errors, setErrors] = useState<FormErrors>({})
  const [photoEdit, setPhotoEdit] = useState(null)

  const goBack = () => {
    navigation.goBack()
  }

  const hasPrimary = useMemo(() => !!details.post_file.filter((img) => img.is_primary).length, [
    details,
  ])

  const onChange = (images: IMedia[]) => {
    const media = images
    setImages(media)
    setErrors({ ...errors, media: null })
    dispatch(
      setPostOption({
        option: "media_files",
        value: media,
      }),
    )
  }

  const onPressNext = () => {
    navigation.navigate(AppStack.postEditExtraInfo, {details})
  }

  const onPressPhoto = (key: string, url: string) => {
    setPhotoEdit({key, url})
  }

  const closeModal = () => {
    setPhotoEdit(null)
  }

  const handleRefreshImages = () => {
    getPostDetails(details?.id)
      .then(({ data }) => {
        const files: IMedia[] = data.post_file.map((file) => ({
          uri: file.public_file.url,
          file_key : file.public_file.key,
          is_primary: file.is_primary,
          name: file.public_file.key,
          // @ts-ignore
          order: file.order,
          type: file.public_file.mime_type,
        }));
        setImages(files);
      })
      .catch(console.error)
  };

  return (
    <Screen backgroundColor={color.background} preset="scroll">
      <Body withBackGroundImage>
        <Header leftIcon="back" onLeftPress={goBack} title={t("media.title")} />
        <View style={CONTAINER}>
          <MediaInput
            hasPrimary={hasPrimary}
            error={errors.media?.message}
            onChange={onChange}
            value={images}
            style={MEDIA}
            postId={details?.id}
            onPressPhoto={onPressPhoto}
          />
          <PhotoEditModal 
            isVisible={photoEdit !== null}
            url={photoEdit?.url}
            photoKey={photoEdit?.key}
            onDismiss={closeModal}
            onChange={onChange}
            images={images}
            postId={details?.id}
            handleRefreshImages={handleRefreshImages}
          />
        </View>
      </Body>
      <Footer>
        <GradientButton
          onPress={onPressNext}
          style={BTN}
          text={t("common.nextStep")}
        />
      </Footer>
    </Screen>
  )
}
