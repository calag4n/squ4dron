import React from 'react'
import { Box, Button } from 'grommet'
import { Plan, Schedules, ChatOption, Basket, Action } from 'grommet-icons'
import PropTypes from 'prop-types'

/**
 * @augments {Component<{  sizeContext:string,  handleClick:Function>}
 */
const Sidebar = ({sizeContext, handleClick}) => (
  <Box>
    <Button
      icon={<Plan size='large' />}
      label='Mes dates'
      margin={sizeContext}
      hoverIndicator
      onClick={e => handleClick('MyCalendar', e)}
    />
    <Button
      icon={<Schedules size='large' />}
      label='Calendrier global'
      margin={sizeContext}
      hoverIndicator
      onClick={e => handleClick('GlobalCalendar', e)}
    />
    <Button
      icon={<ChatOption size='large' />}
      label='Messages'
      margin={sizeContext}
      hoverIndicator
      onClick={e => handleClick('Chat', e)}
    />
    <Button
      icon={<Basket size='large' />}
      label='Liste des tâches'
      margin={sizeContext}
      hoverIndicator
      onClick={e => handleClick('TodoList', e)}
    />
    <Button
      icon={<Action size='large' />}
      label='Déconnexion'
      margin={sizeContext}
      hoverIndicator
      onClick={e => handleClick('Deconnect', e)}
    />
  </Box>
)

Sidebar.propTypes = {
  sizeContext: PropTypes.string,
  handleClick: PropTypes.func.isRequired
}

export default Sidebar
