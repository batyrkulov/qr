import { RootState } from "../../rootReducer";

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectUserIsAdmin = (state: RootState) => state.auth.isAdmin;