import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchComments,
  commentsSelectors,
  deleteComment,
  patchComment,
  updateOneComment,
  likesSelectors,
  removeLikes,
  removeTagById,
} from './commentsSlice'
import Comment from './components/Comment'
import { Button } from 'rsuite'

const Comments = () => {
  const dispatch = useDispatch()
  const allComments = useSelector(commentsSelectors.selectAll)
  const allNestedLikes = useSelector(likesSelectors.selectAll)
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

  console.log({ allNestedLikes })

  return (
    <>
      <Button color="yellow" size="lg" onClick={() => dispatch(removeLikes())}>
        DELET ALL LIKES
      </Button>
      <Button
        color="blue"
        size="lg"
        onClick={() =>
          dispatch(removeTagById('a882d44c-0baf-4d26-844e-8f20a0aa8323'))
        }
      >
        REMOVE TAGE BY ID
      </Button>
      {allComments.map(({ id, body }) => (
        <Comment
          key={id}
          id={id}
          body={body}
          onPatch={onPatch}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </>
  )
}

export default Comments
