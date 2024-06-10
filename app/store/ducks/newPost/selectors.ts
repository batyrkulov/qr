import { RootState } from "../../rootReducer"

export const selectNewPost = (state: RootState) => state.newPost.post
