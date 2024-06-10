import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import KeyboardManager from "react-native-keyboard-manager"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { color } from "../../theme"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { ScreenProps } from "./screen.props"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : { backgroundColor: color.background }

  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <View style={[preset.outer, backgroundStyle]}>
      <StatusBar backgroundColor={color.background} barStyle={props.statusBar || "dark-content"} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </View>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : { backgroundColor: color.background }
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <View style={[preset.outer, backgroundStyle]}>
      <StatusBar backgroundColor={color.background} barStyle={props.statusBar || "dark-content"} />
      <ScrollView
        nestedScrollEnabled
        style={[insetStyle, style]}
        contentContainerStyle={[preset.inner]}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
        showsVerticalScrollIndicator={false}
      >
        {props.children}
      </ScrollView>
    </View>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (Platform.OS === "ios") {
    KeyboardManager.setEnable(true)
  }
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
