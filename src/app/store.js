import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from '../features/comments/commentsSlice'
import myDynamicFormReducer from '../features/myDynamicForm/myDynamicFormSlice'

export default configureStore({
  reducer: {
    comments: commentsReducer,
    myDynamicForm: myDynamicFormReducer,
  },
})
