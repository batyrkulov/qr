import { RootState } from "../../rootReducer"

export const selectAppData = (state: RootState) => state.appInfo.data
