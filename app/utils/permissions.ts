import { Alert, Permission, Platform } from "react-native"
import { check, IOSPermission, openSettings,request, RESULTS } from "react-native-permissions"

type Args = {
  iosPermission: IOSPermission
  androidPermission: Permission
}

export const checkPermission = async ({ iosPermission, androidPermission }: Args) => {
  let status
  if (Platform.OS === "android") {
    status = await check(androidPermission)
  }
  if (Platform.OS === "ios") {
    status = await check(iosPermission)
  }
  return status
}

export const _request = async (name) => {
  const res = await request(name)
  return res === RESULTS.GRANTED
}

export const _onBlocked = () => {
  Alert.alert("Can we access your photos", "To grant permission, you need to open the settings", [
    {
      text: "Ok",
      onPress: () => null,
      style: "cancel",
    },
    {
      text: "Go to settings",
      onPress: openSettings,
    },
  ])

  return false
}

export const askPermission = async ({ iosPermission, androidPermission }: Args) => {
  const permission = Platform.OS === "android" ? androidPermission : iosPermission
  const res = await check(permission)
  let hasPermission = false

  switch (res) {
    case RESULTS.DENIED:
      hasPermission = await _request(permission)
      break
    case RESULTS.BLOCKED:
      hasPermission = _onBlocked()
      break
    case RESULTS.UNAVAILABLE:
      console.log(RESULTS.UNAVAILABLE)
      break
    default:
      hasPermission = true
      break
  }

  return hasPermission
}
