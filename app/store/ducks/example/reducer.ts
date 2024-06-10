/* eslint-disable no-param-reassign */
import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
  work: 'true',
}
export const testAction = createAction('TEST')

export const testReducers = createReducer(initialState, (builder) =>
  builder.addCase(testAction, (state) => {
    state.work = "test"
  }),
)
