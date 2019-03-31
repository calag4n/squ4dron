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
import base from '../../base'

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
    syncDates: {},
    box: [],
    pseudo: ''
  }

  async componentDidMount() {
    await this.setState({ pseudo: this.props.location.state.pseudo })

    const box = await base.fetch(this.state.pseudo, { context: this })
    console.log(box)

    if (box.dates) {
      await this.setState({ box: box.dates })
      await this.setState({ dates: box.dates })
    }

    console.log(this.state.box)
    console.log(this.state.dates)
  }

  async updateDates() {
    if (this.state.box !== undefined) {
      await base.post(`${this.state.pseudo}/dates`, { data: this.state.box })
    }
  }

  resetDb = async () => {
    await base.post(`${this.state.pseudo}/dates`, { data: null })
  }

  onSelect = async addDate => {
    const { dates } = this.state
    let box
    const newDate = addDate.slice(0,10)
    console.log(newDate)
    let isIndex = dates.indexOf(newDate)

    if (isIndex !== -1) {
      dates.splice(isIndex, 1)
    } else {
      dates.push(newDate)
    }

    console.log('before cloning')
    console.log(box)
    console.log(dates)
    // this.resetDb()

    box = [...dates]
    console.log('after cloning')
    console.log(box)
    console.log(dates)

    await this.setState({ dates })
    await this.setState({ box })
    console.log('state')
    console.log(this.state.box)
    console.log(this.state.dates)

    this.updateDates()
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
                    // reference='2019-05-01'
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
