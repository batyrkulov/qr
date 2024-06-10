/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker"
import { PERMISSIONS } from "react-native-permissions"

import { updatePost,uploadPostMedia } from "../../api/post"
import { MARGIN_BOTTOM } from "../../common_styles"
import { IMedia } from "../../store/ducks/newPost/types"
import { askPermission } from "../../utils/permissions"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"
import { CONTAINER, ICON, TEXT, TITLE } from "./styles"

export type AssetWithKey = Results & { file_key: string; is_primary?: boolean; order: number }

type MediaCardProps = {
  withPrimary: boolean
  onChange: (images: IMedia[]) => void
  error?: string | null
  setLoading?: (v: boolean) => void
  disabled?: boolean
  mediaLength: number
  hasPrimary?: boolean
  postId?: number
}

export const MediaCard: FC<MediaCardProps> = ({
  onChange,
  error,
  setLoading,
  disabled,
  mediaLength,
  withPrimary,
  hasPrimary,
  postId = 0,
}) => {
  const { t } = useTranslation()

  const imagePickerOptions: ImageLibraryOptions = {
    includeBase64: false,
    selectionLimit: 0,
    mediaType: "mixed",
    quality:0.5,
    maxHeight:700,
    maxWidth:400,
  }

  const pickMedia = async () => {
    const response = await launchImageLibrary(imagePickerOptions);
    const promises = response.assets.map(uploadPostMedia);

    try {
      setLoading(true)
      const res = await Promise.all(promises)
      let isPrimarySet = hasPrimary
      const mediaFiles = []

      onChange(
        response.assets.map((a, index) => {
          const isPrimary = withPrimary && !isPrimarySet && a.type.includes('image')
          if (isPrimary) {
            isPrimarySet = true
          }

          const fileKey = res[index].data.file_key
          const order = mediaLength + index + 1

          mediaFiles.push({
            key: fileKey,
            is_primary: isPrimary,
            order,
          })

          return {
            name: a.fileName,
            type: a.type,
            uri: a.uri,
            file_key: fileKey,
            is_primary: isPrimary,
            order,
          }
        }),
      )

      if (postId > 0) {
        updatePost({
          postId,
          payload: {
            media_files: mediaFiles,
            details: {},
          },
        })
      }

    } catch (error) {
      console.log(error.response.data)
    }
    setLoading(false)
  }
  const onPress = async () => {
    const result = await askPermission({
      iosPermission: PERMISSIONS.IOS.PHOTO_LIBRARY,
      androidPermission: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    })

    if (result) {
      pickMedia()
    }
  }
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[CONTAINER(error), MARGIN_BOTTOM(10)]}
      >
        <Icon style={ICON} icon={"plus"} />
        <Text style={TITLE}>{t("media.addTitle")} </Text>
        <Text style={TEXT} preset="fieldLabel">
          {t("media.addSubtitle")}
        </Text>
      </TouchableOpacity>
      {!!error && <Text preset="error">{error}</Text>}
    </View>
  )
}
