import { createReducer } from "@reduxjs/toolkit"

import { clearPostData, setPostOption } from "./actions"
import { INewPostState } from "./types"

const initialState: INewPostState = {
  loading: false,
  post: {
    id: null,
    post_type_id: null,
    category_id: null,
    model_id: null,
    title: null,
    description: null,
    price: null,
    client_phone_number: null,
    area_id: null,
    media_files: [],
    details: {},
    is_share_location: true,
    payment_plan_id: null,
  },
}

export const newPostReducers = createReducer(initialState, (builder) =>
  builder
    .addCase(setPostOption, (state, action) => {
      state.post[action.payload.option] = action.payload.value as never
      state.loading = false
    })
    .addCase(clearPostData, (state) => {
      state.post = initialState.post
    }),
)
