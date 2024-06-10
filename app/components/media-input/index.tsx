import React, { FC, useState } from "react"
import { ActivityIndicator, Image, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Video from "react-native-video"

import {deletePostMedia} from "../../api/post"
import { ROW, WRAP } from "../../common_styles"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { IMedia } from '../../store/ducks/newPost/types'
import { color } from "../../theme"
import { Icon } from "../icon/icon"
import { MediaCard } from "../media_card"
import { CARDS_CONTAINER, DELETE, DELETE_ICON, IMAGE, IMAGE_CONTAINER, SPACE } from "./styles"

type MediaInputProps = {
  style?: ViewStyle
  onChange: (v: IMedia[]) => void
  value: IMedia[]
  error: string | null
  hasPrimary: boolean
  postId?: number
  onPressPhoto?: (key: string, url: string) => void
}

export const MediaInput: FC<MediaInputProps> = ({ style, value, onChange, error, hasPrimary, postId = 0, onPressPhoto}) => {
  const [loading, setLoading] = useState(false)
  const deleteImage = (image: IMedia) => {
    deletePostMedia({key: image.file_key})
    onChange(value.filter((i) => i.uri !== image.uri))
  }

  return (
    <>
      <View style={[ROW, WRAP, CARDS_CONTAINER]}>
        {loading && <ActivityIndicator color={color.blue} style={IMAGE_CONTAINER} size="large" />}
        {value.map((file, i) =>
          file.type === "video" ? (
            <View key={file.uri} style={[IMAGE_CONTAINER, MARGIN_RIGHT(i % 2 !== 0 ? 0 : 5)]}>
              <Video style={IMAGE} source={{ uri: file.uri }} />
              <View style={DELETE}>
                <Icon style={DELETE_ICON} icon="delete" onPress={() => deleteImage(file)} />
              </View>
            </View>
          ) : (
            <View key={file.uri} style={[IMAGE_CONTAINER, MARGIN_RIGHT(i % 2 !== 0 ? 0 : 5)]}>
              <TouchableOpacity
                activeOpacity={onPressPhoto ? 0.2 : 1}
                onPress={() => onPressPhoto && onPressPhoto(file.file_key, file.uri)}
              >
                <Image style={IMAGE} source={{ uri: file.uri }} />
              </TouchableOpacity>
              <View style={DELETE}>
                <Icon style={DELETE_ICON} icon="delete" onPress={() => deleteImage(file)} />
              </View>
            </View>
          ),
        )}
        {!loading && (
          <>
            <View>
              <MediaCard
                mediaLength={value.length}
                withPrimary={!hasPrimary}
                disabled={loading}
                error={error}
                onChange={(newValue) => onChange([...newValue, ...value])}
                setLoading={setLoading}
                hasPrimary={hasPrimary}
                postId={postId}
              />
            </View>
            <View style={SPACE} />
          </>
        )}
      </View>
      <View style={{ ...CARDS_CONTAINER, ...style }}></View>
    </>
  )
}
