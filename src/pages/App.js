import React, { Component } from 'react'
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
import base from '../../base'
import MyCalendar from '../components/MyCalendar'
import Chat from '../components/Chat'
import GlobalCalendar from '../components/GlobalCalendar'
import { isEqual } from 'date-fns'

if (typeof document !== 'undefined') document.body.style.margin = 0

const AppBar = props => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '100' }}
    {...props}
  />
)
class App extends Component {
  state = {
    showSidebar: false,
    dates: [],
    box: [],
    pseudo: '',
    section: 'MyCalendar'
  }

  async componentDidMount() {
    await this.setState({ pseudo: this.props.location.state.pseudo })

    const box = await base.fetch(this.state.pseudo, { context: this })

    if (box.dates) {
      await this.setState({ box: box.dates })
      await this.setState({ dates: box.dates })
    }
  }

  async updateDates() {
    if (this.state.box !== undefined) {
      await base.post(`${this.state.pseudo}/dates`, { data: this.state.box })
    }
  }

  onSelect = async addDate => {
    const { dates } = this.state
    let box
    const newDate = addDate.slice(0, 10)
    let isIndex = dates.indexOf(newDate)

    if (isIndex !== -1) {
      dates.splice(isIndex, 1)
    } else {
      dates.push(newDate)
    }

    box = [...dates]

    await this.setState({ dates })
    await this.setState({ box })

    this.updateDates()
  }

  handleClick = (section, event) => {
    event.stopPropagation()
    console.log(event.target)
    console.log(section)
    this.setState({ section })
  }

  section = () => {
    switch (this.state.section) {
      case 'Chat':
        return <Chat />

      case 'GlobalCalendar':
        return <GlobalCalendar />

      case 'ToDoList':
        this.getAllDates()
        return null

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
                  Antre-cool 2019
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
                      <Sidebar handleClick={this.handleClick} />
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
                      <Sidebar handleClick={this.handleClick} />
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

export default App
