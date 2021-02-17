import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Button, ButtonToolbar } from 'rsuite'

const Comment = ({ comment }) => {
  return (
    <Panel header={comment.name} bordered style={{ margin: 20 }}>
      {comment.body}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button size="lg" color="red">
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
  comment: PropTypes.object.isRequired,
}

export default Comment
