import React, { FC } from "react"
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native"

import { color } from "../../theme"
import { BODY } from "./styles"

type BodyProps = {
  withBackGroundImage?: boolean
  containerStyles?: ViewStyle
}

const image = require("../../../assets/images/bg.png")

export const Body: FC<BodyProps> = ({ children, withBackGroundImage, containerStyles }) => {
  const style = { ...BODY, backgroundColor: withBackGroundImage ? null : color.background, ...containerStyles }
  if (withBackGroundImage) {
    return (
      <ImageBackground source={image} style={styles.image}>
        <View style={style}>{children}</View>
      </ImageBackground>
    )
  }
  return <View style={style}>{children}</View>
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
})
