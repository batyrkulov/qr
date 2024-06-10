import { createAction } from "@reduxjs/toolkit"

import { LocationActionsTypes } from "./types"

export const setSelectedDistrict = createAction<string>(LocationActionsTypes.SET_SELECTED_DISTRICT)
export const setSelectedArea = createAction<string>(LocationActionsTypes.SET_SELECTED_AREA)
export const clearLocations = createAction(LocationActionsTypes.CLEAR_LOCATIONS)
