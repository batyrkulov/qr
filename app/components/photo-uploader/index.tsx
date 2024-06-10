import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { Asset, launchImageLibrary } from "react-native-image-picker"
import { PERMISSIONS } from "react-native-permissions"

import { color } from "../../theme"
import { askPermission } from "../../utils/permissions"
import { Icon } from "../icon/icon"
import { CameraIcon } from "../icons"
import { Text } from "../text/text"
import { AVATAR, CAMERA_ICON_BLOCK, CONTAINER, ICON_CONTAINER, LABEL, RED_TEXT } from "./styles"

type PhotoUploaderProps = {
  onChange: (data: Asset) => void
  value?: string
  isEdit: boolean
  deleteAvatar: () => void
}

export const PhotoUploader: FC<PhotoUploaderProps> = ({
  onChange,
  value,
  isEdit,
  deleteAvatar,
}) => {
  const { t } = useTranslation()
  const pickPhoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        return
      }
      if (response) {
        onChange(response.assets[0])
      }
    })
  }
  const handleChoosePhoto = async () => {
    const result = await askPermission({
      iosPermission: PERMISSIONS.IOS.PHOTO_LIBRARY,
      androidPermission: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    })

    if (result) {
      pickPhoto()
    }
  }
  return (
    <TouchableOpacity onPress={handleChoosePhoto} style={CONTAINER}>
      {value ? (
        <>
          <FastImage style={AVATAR} source={{ uri: value }} />
          {isEdit && (
            <>
              <View style={CAMERA_ICON_BLOCK}>
                <CameraIcon stroke={color.palette.white} width={22} height={20} />
              </View>
              <TouchableOpacity onPress={deleteAvatar}>
                <Text style={RED_TEXT} text={t("editProfile.deletePhoto")} />
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
          <View style={ICON_CONTAINER}>
            <Icon icon="camera" />
          </View>
          <Text style={LABEL}>{t("fillProfile.upload")}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}
