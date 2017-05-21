import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import WelcomeContainer from '../containers/welcomecontainer.jsx'
import LoginContainer from '../containers/logincontainer.jsx'
import RegisterContainer from '../containers/registercontainer.jsx'
import PrivateRoute from './privateroute.jsx'
import Protected from './protected.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Router>
      <div>
        <WelcomeContainer/>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={LoginContainer}/>
          <Route exact path="/register" component={RegisterContainer}/>
          <PrivateRoute exact path="/protected" component={Protected}/>
          <Route path="/" component={Err}/>
        </Switch>
      </div>
    </Router>
  }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const Home = () => <h3>Home</h3>
const Err = () => <h3>Error 404</h3>

export default connect(mapStateToProps)(App)