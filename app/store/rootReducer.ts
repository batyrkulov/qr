import AsyncStorage from "@react-native-community/async-storage"
import { combineReducers } from "@reduxjs/toolkit"
import { PersistConfig } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer"

import { appInfoReducers } from "./ducks/app/reducer"
import { authReducers } from "./ducks/auth"
import { IAuthState } from "./ducks/auth/types"
import { categoryReducers } from "./ducks/category/reducer"
import { testReducers } from "./ducks/example/reducer"
import { locationReducers } from "./ducks/location/reducer"
import { metaReducer } from "./ducks/meta"
import { newPostReducers } from "./ducks/newPost/reducer"
import { newTradingReducers } from "./ducks/newTrading/reducer"
import { onBoardingReducers } from "./ducks/onboarding"
import { profileReducers } from "./ducks/profile"

const authPersistConfig: PersistConfig<IAuthState, any, any, any> = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["accessToken", "isAdmin"],
}

export const rootReducer = combineReducers({
  test: testReducers,
  category: categoryReducers,
  location: locationReducers,
  auth: persistReducer(authPersistConfig, authReducers),
  profile: profileReducers,
  onboarding: onBoardingReducers,
  newPost: newPostReducers,
  newTrading: newTradingReducers,
  meta: metaReducer,
  appInfo: appInfoReducers,
})

export type RootState = ReturnType<typeof rootReducer>
