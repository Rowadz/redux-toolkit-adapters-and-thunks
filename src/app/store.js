import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    comments: commentsReducer,
  },
})
