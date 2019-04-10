import React, { Component } from 'react'
import base from '../../base'
import { Box, Form, FormField, Button } from 'grommet'

class TodoList extends Component {
  state = {
    userInput: '',
    items: {}
  }

  componentDidMount() {
    base.syncState('/tasks/', {
      context: this,
      state: 'items'
    })
  }

  onChange(event) {
    this.setState({
      userInput: event.target.value
    })
  }

  addTask(event) {
    event.preventDefault()
    const { items } = { ...this.state }
    items[`task-${Date.now()}`] = this.state.userInput
    this.setState({ items, userInput: '' })
  }

  renderTasksList() {
    const itemsList = Object.keys(this.state.items)
    const { items } = { ...this.state }

    return itemsList.map(item => {
      return (
        <Box
          key={item}
          margin={{
            vertical: 'small'
          }}
          width='medium'
          border={{
            side: 'bottom',
            size: 'xsmall'
          }}
        >
          <Box width='medium' direction='row' justify='between'>
            <span>{items[item]}</span>
            <Button onClick={() => this.deleteTask(item)} label='X' />
          </Box>
        </Box>
      )
    })
  }

  deleteTask(item) {
    const { items } = { ...this.state }
    items[item] = null
    this.setState({ items })
  }

  render() {
    return (
      <Box fill>
        <h1>Liste des tâches</h1>
        <Box width='medium' alignSelf='center' margin={{ bottom: 'medium' }}>
          <Form>
            <FormField
              value={this.state.userInput}
              type='text'
              placeholder='renseignez un item'
              onChange={this.onChange.bind(this)}
            />
            <Button
              type='submit'
              onClick={this.addTask.bind(this)}
              label='Ajouter'
            />
          </Form>
        </Box>
        <Box>{this.renderTasksList()}</Box>
      </Box>
    )
  }
}

export default TodoList
