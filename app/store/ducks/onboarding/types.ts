export interface IOnboardingState {
  cards: any[]
  error: null | string
  loading: boolean
}

export enum OnboardingActionsTypes {
  GET_ONBOARDING = "GET_ONBOARDING",
  STOP_LOADING = "STOP_LOADING",
}
