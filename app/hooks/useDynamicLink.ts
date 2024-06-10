import dynamicLinks from "@react-native-firebase/dynamic-links"
import { useNavigation } from "@react-navigation/native"
import queryString from "query-string"
import { useCallback, useEffect } from "react"

import { AppStack } from "../navigators/constans"

export const useDynamicLink = () => {
  const { navigate } = useNavigation()

  const handleDynamicLink = useCallback(
    (link) => {
      const parsed = queryString.parseUrl(link?.url)

      if (parsed.query.screenName === "post") {
        navigate(AppStack.post, { id: parsed.query.id })
      }
    },
    [navigate],
  )
  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink)
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)
    return () => unsubscribe()
  }, [handleDynamicLink])
}
