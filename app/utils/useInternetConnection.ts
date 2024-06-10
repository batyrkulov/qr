import NetInfo from "@react-native-community/netinfo"
import { StackActions, useNavigation } from "@react-navigation/core"
import { useEffect } from "react"

import { RootStack } from "../navigators/constans"

export const useInternetConnection = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        navigation.dispatch(StackActions.replace(RootStack.noInternet))
      }
    })
    return () => unsubscribe()
  }, [navigation])
}
