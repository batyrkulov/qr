import React from "react"
import { TouchableOpacity,View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BottomTabStack } from "../../navigators/constans"
import { color } from "../../theme"
import { CategoriesTab,CreateTab, FavoriteTab, MessengerTab, PersonalTab } from "../icons"
import { TAB_BTN, WRAPPER } from "./styles"

const Component = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  const { bottom } = useSafeAreaInsets()

  if (focusedOptions.tabBarVisible === false) {
    return null
  }
  return (
    <View style={[WRAPPER, { paddingBottom: 10 + bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={TAB_BTN}
          >
            {route.name === BottomTabStack.homeStack && (
              <CategoriesTab strokeColor={isFocused ? color.palette.blue : color.palette.eastBay} />
            )}
            {route.name === BottomTabStack.messenger && (
              <MessengerTab strokeColor={isFocused ? color.palette.blue : color.palette.eastBay} />
            )}
            {route.name === BottomTabStack.postYourListing && <CreateTab />}
            {route.name === BottomTabStack.favorite && (
              <FavoriteTab
                strokeColor={isFocused ? color.palette.red : color.palette.eastBay}
                fill={isFocused ? color.palette.red : "none"}
              />
            )}
            {route.name === BottomTabStack.personal && (
              <PersonalTab strokeColor={isFocused ? color.palette.blue : color.palette.eastBay} />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export const CustomBottomTabBar = React.memo(Component)
