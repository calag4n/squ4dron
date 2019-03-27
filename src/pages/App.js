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
// import AddedDate from '../components/AddedDate'

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
    showSidebar: true,
    dates: [],
    pseudo: this.props.location.state.key
  }

  onSelect = newDate => {
    const { dates } = this.state
    let isAlreadyIn = false
    let toSplice

    dates.forEach((thatDate, i) => {
      if (thatDate === newDate) {
        isAlreadyIn = true
        toSplice = i
      }
    })
    if (isAlreadyIn) {
      dates.splice(toSplice, 1)
    } else {
      dates.push(newDate)
    }
    console.log(dates)
    this.setState({ dates })
  }

  render() {
    console.log(this.props)
    const { showSidebar, dates, pseudo } = this.state

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
                <Box flex align='center' justify='start'>
                  {' '}
                  <Box
                    margin='small'
                    width='100%'
                    justifyContent='between'
                    gap='small'
                  >
                    <h2>{pseudo} selectionnez des dates.</h2>
                  </Box>
                  <Calendar
                    dates={dates}
                    onSelect={this.onSelect}
                    size='medium'
                    bounds={['2018-11-01', '2019-09-30']}
                    margin={{ vertical: 'large' }}
                    firstDayOfWeek={1}
                    locale='fr-FR'
                    daysOfWeek
                  />
                  {/* <ul>{keptDates}</ul> */}
                </Box>
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
                      <Sidebar />
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
                      <Sidebar />
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
