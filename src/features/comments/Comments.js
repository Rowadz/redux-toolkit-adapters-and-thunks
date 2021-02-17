import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchComments,
  commentsSelectors,
  deleteComment,
} from './commentsSlice'
import Comment from './components/Comment'

const Comments = () => {
  const dispatch = useDispatch()
  const allComments = useSelector(commentsSelectors.selectAll)
  const onDelete = useCallback((id) => dispatch(deleteComment(id)), [])

  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return allComments.map((comment) => (
    <Comment key={comment.id} comment={comment} onDelete={onDelete} />
  ))
}

export default Comments
