import React from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { useDispatch, useSelector } from "react-redux"

import { logout } from "../../store/ducks/auth/actions"
import { selectUser } from "../../store/ducks/profile/selectors"
import { LogOutIcon } from "../icons"
import { Text } from "../text/text"
import { INFO_BLOCK, LEFT_SIDE, LOGOUT_BTN, USER_PHOTO, WRAPPER } from "./styles"

const Component = (): React.ReactElement => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  
  return (
    <View style={WRAPPER}>
      <View style={LEFT_SIDE}>
        <FastImage
          source={user?.avatar?.url ? { uri: user?.avatar?.url } : require('../icons/noavatar.png')}
          style={USER_PHOTO}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={INFO_BLOCK}>
          <Text text={user?.full_name} preset={"header2"} numberOfLines={1} />
          <Text text={user?.email} preset={"secondary"} numberOfLines={1} />
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout} style={LOGOUT_BTN}>
        <LogOutIcon />
      </TouchableOpacity>
    </View>
  )
}

export const MyAccountUserInfo = React.memo(Component)
