import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import App from './App'
// import './App.css'
import Connexion from '../components/Connexion'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from './404'

class Root extends Component{
state= {pseudo:''}

setPseudo = newPseudo => {
  this.setState({pseudo: newPseudo})
}

render (){
return (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={()=> <Connexion setPseudo={this.setPseudo}/> } />
      <Route path='/pseudo/:pseudo' component={()=> <App pseudo={this.state.pseudo} /> } />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  )}

}
export default Root                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   