import { RootState } from "../../rootReducer"

export const selectOptionsTranslations = (state: RootState) => state.meta.optionsTranslations
export const selectIsShowPayment = (state: RootState) => state.meta.iShowPayments
export const selectWantedPrice = (state: RootState) => state.meta.wantedPrice
