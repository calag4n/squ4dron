import React, { Component } from 'react'

import { Grommet, Box, Form, FormField, Button } from 'grommet'
import { navigate } from 'gatsby'
import { grommet } from 'grommet/themes'

// Firebase
import base from '../../base'

class Connexion extends Component {
  state = { pseudo: '', mdp: '' }

  componentDidMount() {
    const logged = localStorage.getItem('log')
    const mdp = localStorage.getItem('mdp')
    if (logged && mdp) {
      navigate(`/App/`, {
        state: { pseudo: logged }
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { name, value } = event.target
    this.setState({ [name]: value })
    const box = await base.fetch(`/users/${this.state.pseudo}`, { context: this })

    if (box.pwd === this.state.mdp) {
      localStorage.setItem('log', this.state.pseudo)
      localStorage.setItem('mdp', true)

      navigate(`/App/`, {
        state: { pseudo: this.state.pseudo }
      })
    }
  }

  render() {
    const { pseudo, mdp } = this.state

    return (
      <Grommet theme={grommet} full>
        <Box fill align='center' justify='center'>
          <Box className='connexionBox'>
            <Form onSubmit={this.handleSubmit} className='connexion'>
              <FormField
                value={pseudo}
                onChange={this.handleChange}
                name='pseudo'
                type='text'
                placeholder='Pseudo'
              />
              <FormField
                value={mdp}
                onChange={this.handleChange}
                name='mdp'
                type='password'
                placeholder='Mot de passe'
              />
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
export default Connexion
