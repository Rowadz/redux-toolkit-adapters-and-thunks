import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const myDynamicFormAdpater = createEntityAdapter({
  selectId: ({ id }) => id,
})

const myDynamicFormSlice = createSlice({
  name: 'myDynamicForm',
  initialState: {},
  reducers: {
    createState(state, { payload: id }) {
      state[id] = myDynamicFormAdpater.getInitialState({ loading: true })
    },
    setAll(state, { payload: { id, array } }) {
      myDynamicFormAdpater.setAll(state[id], array)
    },
  },
})

export const { createState, setAll } = myDynamicFormSlice.actions

export default myDynamicFormSlice.reducer
