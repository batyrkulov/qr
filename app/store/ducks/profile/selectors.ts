import { RootState } from "../../rootReducer";

export const selectUser = (state: RootState) => state.profile.user;