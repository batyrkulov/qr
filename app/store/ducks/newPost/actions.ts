import { createAction } from "@reduxjs/toolkit"

import { IMedia,INewPost, NewPostActionsTypes } from "./types"

export const setPostOption = createAction<{
  option: keyof INewPost
  value: string | number | IMedia[] | boolean
}>(NewPostActionsTypes.SET_POST_OPTION)
export const clearPostData = createAction(NewPostActionsTypes.CLEAR_POST_DATA)
