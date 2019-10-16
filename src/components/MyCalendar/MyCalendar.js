import React from 'react'
import { Box, Calendar } from 'grommet'
import PropTypes from 'prop-types'


const MyCalendar = ({ pseudo, dates, onSelect }) => (
  <Box flex align='center' justify='start'>
    <Box margin='small' width='100%' justifyContent='between' gap='small'>
      <h2>{pseudo} selectionnez des dates.</h2>
    </Box>
    <Calendar
      dates={dates}
      onSelect={onSelect}
      size='medium'
      margin={{ vertical: 'large' }}
      firstDayOfWeek={1}
      locale='fr-FR'
      daysOfWeek
    />
  </Box>
)

MyCalendar.propTypes = {
  pseudo: PropTypes.string.isRequired,
  dates: PropTypes.oneOfType([PropTypes.array,PropTypes.object]).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default MyCalendar
