import React, { FC, useMemo, useState } from "react"
import { Dimensions, Image,Modal, TouchableOpacity, View } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"

import { Cross } from "../../components/icons/Cross"
import { SLIDER_CONTAINER } from "../../screens/Post/styles"
import { color } from "../../theme"
import { CarouselWithPagination, PostImage } from ".."
import { CROSS_ICON_CTR,HEADER } from "./styles"
export interface IImageInfo {
  url: string
  type: string
}

export type ImageSliderProps = {
  images: IImageInfo[]
}

export const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const openImageModal = () => setIsImageModalVisible(true)
  const closeImageModal = () => setIsImageModalVisible(false)
  const onlyImages = useMemo(() => images.filter((i) => !i.type.includes("video")), [images])

  return (
    <View>
      <View style={SLIDER_CONTAINER}>
        <CarouselWithPagination
          containerHeight={260}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width}
          data={images}
          onChange={(index) => setActiveSlide(index)}
          renderItem={({ item, index }: { item: IImageInfo; index: number }) =>
            item.type === "image" ? (
              <TouchableOpacity
                key={item.url}
                activeOpacity={1}
                onPress={() => {
                  const index = onlyImages.findIndex((i) => item.url === i.url)
                  if (index !== -1) {
                    setCurrentImage(index)
                  }
                  openImageModal()
                }}
              >
                <PostImage
                  media_length={images.length}
                  source={{ uri: item.url }}
                  type={item.type}
                />
              </TouchableOpacity>
            ) : index === activeSlide ? (
              <PostImage media_length={images.length} source={{ uri: item.url }} type={item.type} />
            ) : (
              <View />
            )
          }
        />
      </View>
      <Modal visible={isImageModalVisible} transparent={true}>
        <ImageViewer
          index={currentImage}
          enableSwipeDown
          imageUrls={onlyImages}
          swipeDownThreshold={1}
          onSwipeDown={closeImageModal}
          renderImage={(props) => (
            <Image {...props} />
          )}
          renderHeader={() => (
            <View style={HEADER}>
              <TouchableOpacity onPress={closeImageModal} style={CROSS_ICON_CTR}>
                <Cross width={36} height={36} color={color.palette.grey} />
              </TouchableOpacity>
            </View>
          )}
        />
      </Modal>
    </View>
  )
}
