import { RootState } from "../../rootReducer"

export const selectNewTrading = (state: RootState) => state.newTrading.post
