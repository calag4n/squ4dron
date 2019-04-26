import React, { Component } from 'react'
import { navigate } from 'gatsby'
import base from '../../base'
import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext
} from 'grommet'
import { FormClose, Sign } from 'grommet-icons'
import { grommet } from 'grommet/themes'
import Sidebar from '../components/Sidebar'
import MyCalendar from '../components/MyCalendar'
import Chat from '../components/Chat'
import GlobalCalendar from '../components/GlobalCalendar'
import AppBar from '../components/AppBar'
import TodoList from '../components/TodoList'
import PropTypes from 'prop-types'

if (typeof document !== 'undefined') document.body.style.margin = 0

class App extends Component {
  state = {
    showSidebar: false,
    dates: [],
    boxDates: [],
    box: {},
    pseudo: '',
    section: 'MyCalendar'
  }

  async componentDidMount() {
    await this.setState({ pseudo: this.props.location.state.pseudo })
    const pseudo = await this.state.pseudo

    const box = await base.fetch('/users/', { context: this })

    if (box[pseudo].dates) {
      await this.setState({ boxDates: box[pseudo].dates })
      await this.setState({ dates: box[pseudo].dates })
    }

    await this.setState({ box })
  }

  async updateDates() {
    if (this.state.boxDates !== undefined) {
      await base.post(`${this.state.pseudo}/dates`, {
        data: this.state.boxDates
      })
    }
  }

  onSelect = async addDate => {
    const { dates } = this.state
    let boxDates
    const newDate = addDate.slice(0, 10)
    let isIndex = dates.indexOf(newDate)

    if (isIndex !== -1) {
      dates.splice(isIndex, 1)
    } else {
      dates.push(newDate)
    }

    boxDates = [...dates]

    await this.setState({ dates })
    await this.setState({ boxDates })

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

  render() {
    const { showSidebar } = this.state

    return (
      <Grommet theme={grommet} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>
                  Entre Couilles 2019
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
      pseudo: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default App
