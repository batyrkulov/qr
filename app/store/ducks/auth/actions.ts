import { createAction } from "@reduxjs/toolkit";

import { AuthActionsTypes } from "./types";

export const logout = createAction(AuthActionsTypes.LOGOUT)
export const clearAuthError = createAction(AuthActionsTypes.CLEAR_ERROR)
export const setAuthError = createAction<string>(AuthActionsTypes.SET_AUTH_ERROR)