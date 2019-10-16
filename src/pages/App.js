import React, { Component } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet'
import { FormClose, Sign } from 'grommet-icons'
import { grommet } from 'grommet/themes'
import { format, toDate, parse } from 'date-fns'

import base from '../../base'
import Sidebar from '../components/Layout/Sidebar'
import MyCalendar from '../components/MyCalendar/MyCalendar'
import Chat from '../components/Chat/Chat'
import GlobalCalendar from '../components/GlobalCalendar/GlobalCalendar'
import AppBar from '../components/Layout/AppBar'
import TodoList from '../components/TodoList/TodoList'

if (typeof document !== 'undefined') document.body.style.margin = 0

class App extends Component {
  state = {
    showSidebar: false,
    dates: [],
    boxDates: [],
    box: {},
    pseudo: this.props.location.state.pseudo,
    section: 'MyCalendar',
  }

  componentDidMount() {
    const { pseudo } = this.state

    base.fetch('/users/', { context: this }).then(res => {
      if (res[pseudo].dates) {
        const dates = [...res[pseudo].dates]
        this.setState({ dates, boxDates: res[pseudo].dates })
      }
      this.setState({ box: res })
    })
  }

  onSelect = addDate => {
    const { dates } = this.state
    const newDate = addDate.slice(0, 10)
    const isIndex = dates.indexOf(newDate)

    
    if (isIndex !== -1) {
      dates.splice(isIndex, 1)
    } else {
      dates.push(newDate)
    }
    this.setState({ dates, boxDates: dates})    
    
    this.updateDates()
  }

  handleClick = (section, event) => {
    event.stopPropagation()
    this.setState({ section })
    this.setState({ showSidebar: false })
  }

  section = () => {
    switch (this.state.section) {
      case 'Chat':
        return <Chat pseudo={this.state.pseudo} usersData={this.state.box} />

      case 'GlobalCalendar':
        return <GlobalCalendar />

      case 'TodoList':
        return <TodoList />

      case 'Deconnect':
        localStorage.removeItem('log')
        localStorage.removeItem('mdp')
        navigate('/')
        break

      default:
        return (
          <MyCalendar
            dates={this.state.dates}
            pseudo={this.state.pseudo}
            onSelect={this.onSelect}
          />
        )
    }
  }

   updateDates() {
    if (this.state.dates !== undefined) {
       base.post(`users/${this.state.pseudo}/dates`, {
        data: this.state.dates,
      })
    }
  }

  render() {
    const { showSidebar } = this.state
    return (
      <Grommet theme={grommet} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>
                  Squ4dron
                </Heading>
                <Button
                  icon={<Sign color='white' />}
                  onClick={() =>
                    this.setState({ showSidebar: !this.state.showSidebar })
                  }
                />
              </AppBar>
              <Box direction='row' flex>
                {this.section()}

                {!showSidebar || size !== 'small' ? (
                  <Collapsible direction='horizontal' open={showSidebar}>
                    <Box
                      flex
                      width='medium'
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      <Sidebar
                        sizeContext={size}
                        handleClick={this.handleClick}
                      />
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer>
                    <Box
                      background='light-2'
                      tag='header'
                      justify='end'
                      align='center'
                      direction='row'
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => this.setState({ showSidebar: false })}
                      />
                    </Box>
                    <Box
                      fill
                      background='light-2'
                      align='center'
                      justify='center'
                    >
                      <Sidebar
                        sizeContext={size}
                        handleClick={this.handleClick}
                      />
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    )
  }
}

App.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      pseudo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default App
