import React, { FC, useState } from "react"
import {
  //ActivityIndicator,
  Dimensions,
  ImageProps,
  ImageStyle,
  Modal,
  Platform,
  View,
  ViewStyle,
} from "react-native"
import VideoIos from "react-native-video"
import VideoAndroid from "react-native-video-controls"
import FastImage from "react-native-fast-image"

import { INFO_LEFT, INFO_TEXT } from "../../common_styles"
import { Icon } from "../icon/icon"
import { InfoLabel } from "../info-label"
import { Text } from "../text/text"
import { photoUrl } from "../../utils/axios"

const LABEL_CONTAINER: ViewStyle = { position: "absolute", bottom: 20, right: 20 }
const MEDIA: ImageStyle = { minHeight: 260, maxHeight: 260, width: "100%" }
const FULLSCREEN: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  minWidth: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
}

export const PostImage: FC<ImageProps & { type: string; media_length: number }> = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  return (
    <View>
      {props.type === "image" ? (
        <>
          <FastImage
            style={{ width: "100%", height: 260 }}
            source={{
              uri:
                photoUrl +
                "/" +
                props.source.uri.split("/")[props.source.uri.split("/").length - 1] +
                "_type2_compress",
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </>
      ) : Platform.OS === "ios" ? (
        <View>
          <VideoIos resizeMode="cover" controls fullscreen style={MEDIA} {...props} />
        </View>
      ) : isFullScreen ? (
        <Modal visible={isFullScreen} transparent={true}>
          <VideoAndroid
            {...props}
            onEnterFullscreen={() => setIsFullScreen(true)}
            onExitFullscreen={() => setIsFullScreen(false)}
            style={FULLSCREEN}
            disableBack
            disableVolume
            isFullScreen={isFullScreen}
          />
        </Modal>
      ) : (
        <VideoAndroid
          {...props}
          onEnterFullscreen={() => setIsFullScreen(true)}
          onExitFullscreen={() => setIsFullScreen(false)}
          style={MEDIA}
          disableVolume
          disableBack
          isFullScreen={isFullScreen}
        />
      )}
      {props.type !== "video" && (
        <View style={LABEL_CONTAINER}>
          <InfoLabel>
            <Text style={[INFO_TEXT, INFO_LEFT]} text={props.media_length.toString()} />
            <Icon icon="cameraBlueOutlined" />
          </InfoLabel>
        </View>
      )}
    </View>
  )
}
