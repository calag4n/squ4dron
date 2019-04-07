import React, { Component, createRef } from 'react'
import './Chat.css'
import ChatForm from './ChatForm'
import Message from './Message'

import base from '../../base'
import { Box } from 'grommet'

class Chat extends Component {
  state = { messages: {}, pseudo: this.props.pseudo }

  messageRef = createRef()

  componentDidMount() {
    base.syncState('/messages/', {
      context: this,
      state: 'messages'
    })
  }
  componentDidUpdate() {
    const ref = this.messageRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message

    // Object.keys(messages)
    //   .slice(0, -10)
    //   .forEach(key => {
    //     messages[key] = null
    //   })

    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  async getColor(pseudo) {
    const box = await base.fetch(pseudo, { context: this })
    console.log(box.color)
    return box.color
  }

  render() {
    const messagesList = Object.keys(this.state.messages).map(key => {
      const pseudo = this.state.messages[key].pseudo
      const color = this.getColor(pseudo)
      return (
        <Message
        key={key}
        user={{pseudo, color}}
        message={this.state.messages[key].message}
        isUser={this.isUser}
        />
      
        )})

    return (
      <Box fill>
        <Box fill className='box' flex justify='end' margin={{'bottom':'small'}}>
          <Box className='messages' ref={this.messageRef}>
            <Box className='message'>{messagesList}</Box>
          </Box>
          <ChatForm
            length='150'
            pseudo={this.state.pseudo}
            addMessage={this.addMessage}
          />
        </Box>
      </Box>
    )
  }
}

export default Chat
