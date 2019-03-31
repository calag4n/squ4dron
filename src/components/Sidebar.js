import React, { Component } from 'react'
import { Box, Button } from 'grommet'
import { Plan, Schedules, ChatOption, Basket } from 'grommet-icons'
import { navigate } from 'gatsby'

class Sidebar extends Component {


  render() {
    return (
      <Box>
        <Button
          name='MyCalendar'
          icon={<Plan size='large'/>}
          label='Mes dates'
          margin='large'
          hoverIndicator
          onClick={this.props.handleClick}
          
        />
        <Button
          name='GlobalCalendar'
          icon={<Schedules size='large'/>}
          label='Calendrier global'
          margin='large'
          hoverIndicator
          onClick={this.props.handleClick}
          
        />
        <Button
          name='Chat'
          icon={<ChatOption size='large'/>}
          label='Messages'
          margin='large'
          hoverIndicator
          onClick={this.props.handleClick}
          
        />
        <Button
          name='ToDoList'
          icon={<Basket size='large'/>}
          label='Liste des courses'
          margin='large'
          hoverIndicator
          onClick={this.props.handleClick}
          
        />
      </Box>
    )
  }
}

export default Sidebar
