import React, { FC, useState } from "react";
import { ActivityIndicator, Image, ImageStyle, StyleProp, View } from "react-native";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";

import { uploadChatMedia } from "../../api/post";
import { FLEX, ROW } from "../../common_styles";
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles";
import { color } from "../../theme";
import { AssetWithKey } from "..";
import { Icon } from "../icon/icon";
import { Input } from "../input";
import { DELETE, MEDIA, MEDIA_CONTAINER, MEDIA_ROW } from "./styles";

type ChatFormProps = {
  message: string
  setMessage: (v: string) => void
  media: AssetWithKey[]
  setMedia: React.Dispatch<React.SetStateAction<AssetWithKey[]>>
  onSubmit: () => void
  disabled?: boolean
}

export const ChatForm: FC<ChatFormProps> = ({
  message,
  media,
  setMessage,
  setMedia,
  onSubmit,
  disabled,
}) => {
  const [loading, setLoading] = useState(false)
  
  const imagePickerOptions: ImageLibraryOptions = {
    includeBase64: false,
    selectionLimit: 5,
    mediaType: "mixed",
  }
  
  const pickMedia = async () => {
    const response = await launchImageLibrary(imagePickerOptions);

    const promises = response.assets.map(uploadChatMedia)
    
    try {
      setLoading(true)
      const res = await Promise.all(promises)
      setMedia((m) => [
        ...m,
        ...response.assets.map((a, index) => {
          return {
            ...a,
            file_key: res[index].data.file_key,
            order: media.length + index + 1,
          }
        }),
      ])
    } catch (error) {
      console.log(error.response.data)
    }
    setLoading(false)
  }

  const deleteAsset = (key: string) => {
    setMedia(media.filter((assets) => assets.file_key !== key))
  }

  return (
    <View>
      <View style={MEDIA_ROW}>
        {loading && <ActivityIndicator color={color.blue} style={MEDIA_CONTAINER} size="large" />}
        {media.map((asset) => (
          <View style={MEDIA_CONTAINER} key={asset.file_key}>
            <Image style={MEDIA} source={{ uri: asset.path }} />
            <View style={DELETE}>
              <Icon onPress={() => deleteAsset(asset.file_key)} icon="delete" />
            </View>
          </View>
        ))}
      </View>
      <View style={ROW}>
        <Icon
          disabled={disabled}
          onPress={pickMedia}
          style={MARGIN_RIGHT(15) as StyleProp<ImageStyle>}
          icon="clip"
        />

        <Input
          editable={!disabled}
          value={message}
          onChangeText={setMessage}
          noLabel
          style={[FLEX(3), MARGIN_RIGHT(8)]}
          placeholder="Write a message"
        />
        <Icon disabled={disabled} icon="send" onPress={onSubmit} />
      </View>
    </View>
  )
}
