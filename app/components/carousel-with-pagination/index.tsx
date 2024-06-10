import React, { FC, useEffect, useRef, useState } from "react"
import { View } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"

import { color } from "../../theme"
import { DOT } from "../recommended-carousel"

type CarouselWithPaginationProps = {
  renderItem: (data: any) => JSX.Element
  data: any[]
  sliderWidth: number
  itemWidth: number
  onChange?: (index: number) => void
  containerHeight?: number
} & any

export const CarouselWithPagination: FC<CarouselWithPaginationProps> = ({
  renderItem,
  data,
  sliderWidth,
  itemWidth,
  onChange,
  containerHeight = 220,
  ...rest
}) => {
  const carousel = useRef()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerStyle = { height: containerHeight }
  const paginationStyle = { paddingVertical: 10 }
  useEffect(() => {
    if (onChange) {
      onChange(activeIndex)
    }
  })

  return (
    <View>
      <Carousel
        onSnapToItem={setActiveIndex}
        ref={carousel}
        data={data}
        sliderWidth={sliderWidth}
        renderItem={renderItem}
        itemWidth={itemWidth}
        {...rest}
        containerCustomStyle={containerStyle}
      />
      <Pagination
        containerStyle={paginationStyle}
        carouselRef={carousel}
        activeDotIndex={activeIndex}
        dotColor={color.palette.fountainBlue}
        dotStyle={DOT}
        inactiveDotColor={color.palette.blackSqueeze}
        dotsLength={data.length}
        inactiveDotScale={1}
      />
    </View>
  )
}
