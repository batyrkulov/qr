import { createAction } from "@reduxjs/toolkit";

import { OnboardingActionsTypes } from "./types";

export const stopLoading = createAction(OnboardingActionsTypes.STOP_LOADING)