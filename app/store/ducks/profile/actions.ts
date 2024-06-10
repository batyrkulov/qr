import { createAction } from "@reduxjs/toolkit";

import { ProfileActionsTypes } from "./types";

export const clearUser = createAction(ProfileActionsTypes.CLEAR_USER)
export const stopLoading = createAction(ProfileActionsTypes.STOP_LOADING)