import { Mixpanel } from "mixpanel-react-native"
import React, { useContext } from "react"

export const mixpanel = new Mixpanel("59c22f2b34501877499f6bc9374c53ed")
mixpanel.init()

export const MixpanelContext = React.createContext(mixpanel)
export const MixpanelProvider = MixpanelContext.Provider
export const useMixpanel = () => {
  const mixpanel = useContext(MixpanelContext)
  return mixpanel
}
