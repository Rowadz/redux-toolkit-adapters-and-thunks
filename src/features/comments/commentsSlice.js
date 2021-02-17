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

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
    setOneComments: commentsAdapter.removeOne,
    setManyComments: commentsAdapter.addMany,
  },
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
    [deleteComment.rejected](state) {
      state.loading = false
    },
    [deleteComment.pending](state) {
      state.loading = true
    },
    [deleteComment.fulfilled](state, { payload: id }) {
      state.loading = false
      commentsAdapter.removeOne(state, id)
    },
  },
})

export const commentsSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
)

export const {
  setAllComments,
  setManyComments,
  setOneComments,
} = commentsSlice.actions

export default commentsSlice.reducer
