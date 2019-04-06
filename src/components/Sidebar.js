import React, { Component } from 'react'
import { Box, Button } from 'grommet'
import { Plan, Schedules, ChatOption, Basket, Action } from 'grommet-icons'

class Sidebar extends Component {
  render() {
    return (
      <Box>
        <Button
          icon={<Plan size='large' />}
          label='Mes dates'
          margin={this.props.sizeContext}
          hoverIndicator
          onClick={(e) => this.props.handleClick('MyCalendar',e)}
        />
        <Button
          icon={<Schedules size='large' />}
          label='Calendrier global'
          margin={this.props.sizeContext}
          hoverIndicator
          onClick={(e) => this.props.handleClick('GlobalCalendar',e)}
        />
        <Button
          icon={<ChatOption size='large' />}
          label='Messages'
          margin={this.props.sizeContext}
          hoverIndicator
          onClick={(e) => this.props.handleClick('Chat',e)}
        />
        <Button
          icon={<Basket size='large' />}
          label='Liste des tâches'
          margin={this.props.sizeContext}
          hoverIndicator
          onClick={(e) => this.props.handleClick('ToDoList',e)}
        />
        <Button
          icon={<Action size='large' />}
          label='Déconnexion'
          margin={this.props.sizeContext}
          hoverIndicator
          onClick={(e) => this.props.handleClick('Deconnect',e)}
        />
      </Box>
    )
  }
}

export default Sidebar
