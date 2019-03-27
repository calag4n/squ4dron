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
import base from '../base'

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
    date2: [],
    inObjectDate: {},
    pseudo: ''
  }

  componentDidMount() {
    const { dates2, inObjectDate } = this.state
    this.setState({ pseudo: this.props.location.state.pseudo })

    this.ref = base.syncState(`/${this.state.pseudo}/dates`, {
      context: this,
      state: 'inObjectDate'
    })
    console.log(inObjectDate)
    //  inObjectDate.forEach(date=>{
    //    dates2.push(date)
    //  })
    //  console.log(dates2)
  }

  onSelect =  newDate => {
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
    console.log(this.state.inObjectDate)
    this.setState({ dates })

    // const box = await base.fetch(this.state.pseudo, { context: this })

    // await base.post(`/${this.state.pseudo}/dates`, { data: dates })
  }

  render() {
 

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
