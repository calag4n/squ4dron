import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Grommet, Box, Form, FormField, Button } from 'grommet'
import PropTypes from 'prop-types'
import { grommet } from 'grommet/themes'

class Connexion extends Component {
  state = { pseudo: '', goToApp: false }

  handleChange = event => {
    const pseudo = event.target.value
    this.setState({ pseudo })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.setPseudo(this.state.pseudo)
    this.setState({ goToApp: true })
  }

  render() {
    const { pseudo, goToApp } = this.state

    if (goToApp) {
      return <Redirect push to={`/pseudo/${pseudo}`} />
    }
    return (
      <Grommet theme={grommet} full>
        <Box fill align='center' justify='center'>
          <Box className='connexionBox'>
            <Form onSubmit={this.handleSubmit} className='connexion'>
              <FormField
                value={pseudo}
                onChange={this.handleChange}
                type='text'
                placeholder='Pseudo'
                required
              />
              <FormField type='password' placeholder='Mot de passe' />
              <Box direction='row' justify='center' margin={{ top: 'medium' }}>
                <Button type='submit' label='GO' />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    )
  }
}

Connexion.propTypes = {
  setPseudo: PropTypes.func.isRequired
}

export default Connexion
