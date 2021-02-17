import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    return await fetch(
      'https://jsonplaceholder.typicode.com/comments?_limit=10'
    ).then((res) => res.json())
  }
)

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {},
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false
      commentsAdapter.setAll(state, payload)
    },
    [fetchComments.rejected](state) {
      state.loading = false
    },
  },
})

export default commentsSlice.reducer
