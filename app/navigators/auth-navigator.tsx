import { StackActions, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { useToast } from "react-native-toast-notifications"
import { useDispatch, useSelector } from "react-redux"

import { EnterCodeScreen } from "../screens/Auth/EnterCode"
import { LoginScreen } from "../screens/Auth/Login"
import { NewPasswordScreen } from "../screens/Auth/NewPassword"
import { RestorePasswordScreen } from "../screens/Auth/RestorePassword"
import { SignUpScreen } from "../screens/Auth/SignUp"
import { clearAuthError } from "../store/ducks/auth/actions"
import { selectAuthError } from "../store/ducks/auth/selectors"
import { getPhoneCodes } from "../store/ducks/auth/thunks"
import { selectUser } from "../store/ducks/profile/selectors"
import { AuthStack, CodeTypes, MainStack } from "./constans"

export type PrimaryParamList = {
  login: undefined
  restorePassword: undefined
  enterCode: {
    type: CodeTypes
    data: { phone_code_id: number; phone: number; password?: string; email?: string }
  }
  newPassword: { data: { phone_code_id: number; phone: number; code: string } }
  signUp: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function AuthNavigator() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const error = useSelector(selectAuthError)
  const toast = useToast()
  useEffect(() => {
    if (user) {
      navigation.dispatch(StackActions.replace(MainStack.appStack))
    } else {
      dispatch(getPhoneCodes())
    }
  }, [dispatch, navigation, user])

  useEffect(() => {
    if (error) {
      toast.show(error)
      dispatch(clearAuthError())
    }
  }, [dispatch, error, toast])
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthStack.login} component={LoginScreen} />
      <Stack.Screen name={AuthStack.restorePassword} component={RestorePasswordScreen} />
      <Stack.Screen name={AuthStack.enterCode} component={EnterCodeScreen} />
      <Stack.Screen name={AuthStack.newPassword} component={NewPasswordScreen} />
      <Stack.Screen name={AuthStack.signUp} component={SignUpScreen} />
    </Stack.Navigator>
  )
}
