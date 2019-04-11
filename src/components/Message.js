import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ user, message, isUser }) => {
  if (isUser(user.pseudo)) {
    console.log(user)
    return (
      <p className='user-message' style={{ 'boxShadow' : `-2px -2px ${user.color}` }}>
        {message}
      </p>
    )
  } else {
    return (
      <p
        className='not-user-message'
        style={{ 'box-shadow' : `2px 2px ${user.color}` }}
      >
        <strong>{user.pseudo}: </strong>
        {message}
      </p>
    )
  }
}

Message.propTypes = {
  isUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
}
export default Message
