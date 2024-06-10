import { ImageStyle,TextStyle,ViewStyle } from "react-native"

export const CONTAINER: ViewStyle = {
  marginHorizontal: 20,
  flex: 1,
}

export const IMAGE: ImageStyle = {
  marginTop: '20%',
  height: 280,
  width: "100%",
}

export const DELETE_CONTAINER: ViewStyle = {
  marginTop: 10,
  marginLeft: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
}

export const TEXT_DELETE: TextStyle = {
  paddingLeft: 5,
  color: "#FF9288",
}

export const BOTTOM_BUTTONS: ViewStyle = {
  position: "absolute",
  bottom: 28,
  left: 0,
  paddingHorizontal: 60,
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
}

export const BOTTOM_BUTTON: ViewStyle = {
  backgroundColor: "#626D8C",
  width: 44,
  height: 44,
  borderRadius: 22,
  alignItems: "center",
  justifyContent: "center",
}

export const BUTTON_WRAPPER: ViewStyle = {
  alignItems: "center",
}

export const SPINNER: ViewStyle = {
  position: 'absolute', 
  top: '50%', 
  left: '50%', 
  transform: [{ translateX: -30 }, { translateY: -30 }],
  zIndex: 2,
}
