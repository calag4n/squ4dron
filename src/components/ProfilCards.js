import React from 'react'
import { Box, Layer, Text } from 'grommet'

const ProfilCards = ({ isThere, onClose }) => {
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

export default ProfilCards
