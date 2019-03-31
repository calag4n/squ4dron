import React, { Component } from 'react'
import {
  Box,
  Button,
  Calendar,
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
    Section: 'App'
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

  handleClick = event => {
    const Section = event.target.name
    this.setState({ Section })
  }

  render() {
    const { showSidebar, dates, pseudo, Section } = this.state

    return (
      <Grommet theme={grommet} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>
                  Entre-Couilles 2019
                </Heading>
                <Button
                  icon={<Sign color='white' />}
                  onClick={() =>
                    this.setState({ showSidebar: !this.state.showSidebar })
                  }
                />
              </AppBar>
              <Box direction='row' flex>
                <MyCalendar
                  dates={dates}
                  pseudo={pseudo}
                  onSelect={this.onSelect}
                />

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
                      <Sidebar hadleClick={this.handleClick} />
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
