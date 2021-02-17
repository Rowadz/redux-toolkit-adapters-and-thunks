import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, commentsSelectors } from './commentsSlice'
import Comment from './components/Comment'

const Comments = () => {
  const dispatch = useDispatch()
  const allComments = useSelector(commentsSelectors.selectAll)

  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return allComments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ))
}

export default Comments
