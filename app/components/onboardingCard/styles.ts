import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native"

export const CARD: ViewStyle = {
  borderTopRightRadius: 70,
  borderTopLeftRadius: 70,
  flex: 1,
  alignItems: "center",
  paddingHorizontal: 14,
  paddingTop: Dimensions.get("screen").height / 15,
}

export const IMAGE: ImageStyle = {
  height: Dimensions.get("screen").height / 3,
  width: "115%",
  overflow: "visible",
  marginBottom: 50,
}

export const DOTS_CONTAINER: ViewStyle = {
  flexDirection: "row",
  position: "absolute",
  bottom: Dimensions.get("screen").height / 64,
}

export const DOT = (active: boolean): ViewStyle => {
  return {
    borderRadius: 50,
    backgroundColor: active ? "#0892F9" : "#E4EBF5",
    width: 8,
    height: 8,
    marginRight: 8,
  }
}

export const TITLE_TEXT: TextStyle = { textAlign: "center", maxWidth: "80%" }
export const HEADER: ViewStyle = { flexDirection: "row-reverse", width: "100%", marginBottom: 17 }
export const HEADER_CONTENT: ViewStyle = { height: 26 }
export const BTN: ViewStyle = { marginTop: 16 }
