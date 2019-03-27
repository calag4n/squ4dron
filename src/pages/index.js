import React, { Component } from 'react'
import App from './App'
import { Grommet, Box, Form, FormField, Button } from 'grommet'
import {navigate} from 'gatsby'
import { grommet } from 'grommet/themes'

class Connexion extends Component {
  state = { pseudo: '', goToApp: false }

  handleChange = event => {
    const pseudo = event.target.value
    this.setState({ pseudo })
  }

  handleSubmit = event => {
    event.preventDefault()
    navigate(`/App/`,
    {
      state: {{pseudo: this.state.pseudo}}
    })
  }

  render() {
    const { pseudo, goToApp } = this.state

    // if (goToApp) {
    //   return <App to={`/pseudo/${pseudo}`} pseudo={pseudo}/>
    // }
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
export default Connexion
