import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const data = await fetch('http://localhost:3001/comments').then((res) =>
      res.json()
    )
    const mappedData = data.map((comment) => ({
      ...comment,
      tags: comment.tags.map((tag) => ({ ...tag, commentId: comment.id })),
      likes: comment.likes.map((like) => ({ ...like, commentId: comment.id })),
    }))
    const tags = mappedData
      .reduce((prev, curr) => [...prev, curr.tags], [])
      .flat()
    const likes = mappedData
      .reduce((prev, curr) => [...prev, curr.likes], [])
      .flat()
    const comments = mappedData.map(({ id, body, likes, tags }) => ({
      id,
      body,
      likesIds: likes.map((like) => like.id),
      tagsIds: tags.map((tag) => tag.id),
    }))
    return { comments, likes, tags }
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id) => {
    await fetch(`http://localhost:3001/comments/${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

export const patchComment = createAsyncThunk(
  'comments/patchComment',
  async ({ id, newObj }) => {
    await fetch(`http://localhost:3001/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newObj),
    })
    return { id, changes: newObj }
  }
)

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
})

const likesAdapter = createEntityAdapter({
  selectId: (like) => like.id,
})

const tagsAdapter = createEntityAdapter({
  selectId: (tag) => tag.id,
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({
    loading: false,
    likes: likesAdapter.getInitialState(),
    tags: tagsAdapter.getInitialState(),
  }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
    setOneComments: commentsAdapter.removeOne,
    setManyComments: commentsAdapter.addMany,
    updateOneComment: commentsAdapter.updateOne,
    removeLikes(state) {
      likesAdapter.removeAll(state.likes, {})
    },
    removeTagById(state, { payload: tagId }) {
      const { commentId } = tagsAdapter
        .getSelectors()
        .selectById(state.tags, tagId)
      const comment = commentsAdapter
        .getSelectors()
        .selectById(state, commentId)
      commentsAdapter.updateOne(state, {
        id: comment.id,
        changes: {
          ...comment,
          tagsIds: comment.tagsIds.filter((id) => id !== tagId),
        },
      })
      tagsAdapter.removeOne(state.tags, tagId)
    },
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false
      commentsAdapter.setAll(state, payload.comments)
      tagsAdapter.setAll(state.tags, payload.tags)
      likesAdapter.setAll(state.likes, payload.likes)
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
    [patchComment.pending](state) {
      state.loading = true
    },
    [patchComment.fulfilled](state, { payload }) {
      state.loading = false
      commentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      })
    },
  },
})

export const commentsSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
)

export const likesSelectors = likesAdapter.getSelectors(
  (state) => state.comments.likes
)

export const {
  setAllComments,
  setManyComments,
  setOneComments,
  updateOneComment,
  removeLikes,
  removeTagById,
} = commentsSlice.actions

export default commentsSlice.reducer
