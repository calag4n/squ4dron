import React from 'react'
import { Box, Calendar } from 'grommet'
import PropTypes from 'prop-types'

/**
 * @augments {Component<{  pseudo :string.isRequired,dates :array.isRequired,onSelect :Function.isRequired>}
 */
const MyCalendar = ({ pseudo, dates, onSelect }) => (
  <Box flex align='center' justify='start'>
    <Box margin='small' width='100%' justifyContent='between' gap='small'>
      <h2>{pseudo} selectionnez des dates.</h2>
    </Box>
    <Calendar
      dates={dates}
      onSelect={onSelect}
      size='medium'
      bounds={['2019-01-01', '2020-09-30']}
      margin={{ vertical: 'large' }}
      firstDayOfWeek={1}
      locale='fr-FR'
      daysOfWeek
    />
  </Box>
)

MyCalendar.propTypes = {
  pseudo: PropTypes.string.isRequired,
  dates: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default MyCalendar
