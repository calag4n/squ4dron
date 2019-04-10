import React, { Component } from 'react'
import { Form, TextArea, Button } from 'grommet'

class ChatForm extends Component {
  state = { message: '' }

  handleSubmit = event => {
    event.preventDefault()
    this.createMessage()
  }

  handleChange = event => {
    const message = event.target.value
    this.setState({ message })
  }

  handleKeyUp = event => {
    if (event.key === 'Enter') {
      this.createMessage()
    }
  }

  createMessage = () => {
    const { pseudo, addMessage } = this.props

    const message = {
      pseudo,
      message: this.state.message
    }

    addMessage(message)
    this.setState({ message: '' })
  }

  render() {
    const { message } = this.state

    return (
      <Form
        onSubmit={this.handleSubmit}
        className='form'
        style={{ padding: '1.1em' }}
        align='end'
      >
        <TextArea
          value={message}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          required
          margin='medium'
        />
        <Button type='submit' label='Envoyer' />
      </Form>
    )
  }
}

export default ChatForm
