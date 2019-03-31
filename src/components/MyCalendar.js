import React, { Component } from 'react'
import { Box, Calendar } from 'grommet'

class MyCalendar extends Component {
  render() {
    return (
      <Box flex align='center' justify='start'>
        {' '}
        <Box margin='small' width='100%' justifyContent='between' gap='small'>
          <h2>{this.props.pseudo} selectionnez des dates.</h2>
        </Box>
        <Calendar
          dates={this.props.dates}
          onSelect={this.props.onSelect}
          size='medium'
          bounds={['2019-01-01', '2020-09-30']}
          margin={{ vertical: 'large' }}
          firstDayOfWeek={1}
          locale='fr-FR'
          daysOfWeek
        />
      </Box>
    )
  }
}

export default MyCalendar
