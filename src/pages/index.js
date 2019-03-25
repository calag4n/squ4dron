import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import App from './App'
// import './App.css'
import Connexion from '../components/Connexion'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from './404'

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Connexion} />
      <Route path='/pseudo/:pseudo' component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Root
