import AsyncStorage from "@react-native-community/async-storage"
import { Action, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import { ThunkAction } from "redux-thunk"

import { rootReducer, RootState } from "./rootReducer"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["example", "category", "location", "profile", "onboarding", "auth", "newPost", "meta"],
  // whitelist: ['login', 'user'] - list of the reducers should be whitelisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
