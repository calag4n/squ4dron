import React, { Component } from 'react'
import { Form, TextArea, Button } from 'grommet'

class ChatForm extends Component {
  state = { message: '', length: this.props.length }

  handleSubmit = event => {
    event.preventDefault()
    this.createMessage()
  }

  handleChange = event => {
    const message = event.target.value
    const length = this.props.length - message.length
    this.setState({ message, length })
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
    this.setState({ message: '', length: this.props.length })
  }

  render() {
    const { message } = this.state

    return (
      <Form
        onSubmit={this.handleSubmit}
        className='form'
        style={{padding : '1.1em'}}
        align='end'
      >
        <TextArea
          value={message}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          required
          maxLength={this.props.length}
          margin='medium' 
        />
        <div className='info'>{this.state.length}</div>
        <Button type='submit' label='Envoyer' />
      </Form>
    )
  }
}

export default ChatForm
