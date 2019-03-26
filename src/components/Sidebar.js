import React, { Component } from 'react'
import { Box, Button } from 'grommet'
import { Plan, Schedules, ChatOption, Basket } from 'grommet-icons'

class Sidebar extends Component {
  render() {
    return (
      <Box>
        <Button
          icon={<Plan size='large'/>}
          label='Mes dates'
          margin='large'
          hoverIndicator
          // onClick={}
          
        />
        <Button
          icon={<Schedules size='large'/>}
          label='Calendrier global'
          margin='large'
          hoverIndicator
          // onClick={}
          
        />
        <Button
          icon={<ChatOption size='large'/>}
          label='Messages'
          margin='large'
          hoverIndicator
          // onClick={}
          
        />
        <Button
          icon={<Basket size='large'/>}
          label='Liste des courses'
          margin='large'
          hoverIndicator
          // onClick={}
          
        />
      </Box>
    )
  }
}

export default Sidebar
