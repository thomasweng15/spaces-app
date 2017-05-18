import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import WelcomeHeader from '../modules/welcomeheader.jsx'
import Login from '../modules/login.jsx'
import { Protected, PrivateRoute } from '../modules/privateroute.jsx'

const App = () => (
  <Router>
    <div>
      <WelcomeHeader/>
      <ul>
        <li><Link to="/">Home Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute exact path="/protected" component={Protected}/>
        <Route path="/" component={Err}/>
      </Switch>
    </div>
  </Router>
)

const Home = () => <h3>Home</h3>
const Err = () => <h3>Error 404</h3>

export default App