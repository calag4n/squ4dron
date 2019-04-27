import React from 'react'
import { Box, Layer, Text } from 'grommet'
import PropTypes from 'prop-types'

const CardsList = ({ isThere, onClose }) => {
  const present = isThere.map(person => (
    <Box
      key={person.name}
      style={{
        backgroundColor: '#BBB',
        border: `2px solid ${person.color}`
      }}
    >
      {person.name}
    </Box>
  ))

  return (
    <Layer position='bottom' onClickOutside={onClose}>
      <Box pad='large' gap='medium'>
        <Text>Disponibles :</Text>
        <Box direction='row' gap='medium' align='center'>
          {present}
        </Box>
      </Box>
    </Layer>
  )
}

CardsList.propTypes = {
  isThere: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func.isRequired
}

export default CardsList
