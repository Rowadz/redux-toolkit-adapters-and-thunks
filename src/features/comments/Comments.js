import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchComments,
  commentsSelectors,
  deleteComment,
  patchComment,
  updateOneComment,
} from './commentsSlice'
import Comment from './components/Comment'

const Comments = () => {
  const dispatch = useDispatch()
  const allComments = useSelector(commentsSelectors.selectAll)
  const onDelete = useCallback((id) => dispatch(deleteComment(id)), [])
  const onPatch = useCallback(
    (id, newObj) => dispatch(patchComment({ id, newObj })),
    []
  )
  const onUpdate = useCallback((id, newObj) => {
    dispatch(updateOneComment({ id, changes: newObj }))
  }, [])

  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  return allComments.map(({ id, body }) => (
    <Comment
      key={id}
      id={id}
      body={body}
      onPatch={onPatch}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  ))
}

export default Comments
