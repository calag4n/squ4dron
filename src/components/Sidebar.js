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
          margin='large'
          hoverIndicator
          onClick={(e) => this.props.handleClick('MyCalendar',e)}
        />
        <Button
          icon={<Schedules size='large' />}
          label='Calendrier global'
          margin='large'
          hoverIndicator
          onClick={(e) => this.props.handleClick('GlobalCalendar',e)}
        />
        <Button
          icon={<ChatOption size='large' />}
          label='Messages'
          margin='large'
          hoverIndicator
          onClick={(e) => this.props.handleClick('Chat',e)}
        />
        <Button
          icon={<Basket size='large' />}
          label='Liste des tâches'
          margin='large'
          hoverIndicator
          onClick={(e) => this.props.handleClick('ToDoList',e)}
        />
        <Button
          icon={<Action size='large' />}
          label='Déconnexion'
          margin='large'
          hoverIndicator
          onClick={(e) => this.props.handleClick('Deconnect',e)}
        />
      </Box>
    )
  }
}

export default Sidebar
