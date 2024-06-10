import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchOnboarding } from "../../../api/onboarding";
import { OnboardingActionsTypes } from "./types";

export const getOnBoarding = createAsyncThunk(OnboardingActionsTypes.GET_ONBOARDING, async () => {
  try {
    const response = await fetchOnboarding()
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
})