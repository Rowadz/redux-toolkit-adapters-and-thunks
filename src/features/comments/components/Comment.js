import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Button, ButtonToolbar } from 'rsuite'

const Comment = ({ comment, onDelete }) => {
  return (
    <Panel header={<h1>{comment.id}</h1>} bordered style={{ margin: 20 }}>
      {comment.body}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button size="lg" color="red" onClick={() => onDelete(comment.id)}>
          Delete
        </Button>
        <Button size="lg" color="cyan">
          Patch
        </Button>
      </ButtonToolbar>
    </Panel>
  )
}

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
}

export default Comment
