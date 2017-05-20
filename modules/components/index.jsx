import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import WelcomeContainer from './welcomeheader.jsx'
import Login from './login.jsx'
import Register from './register.jsx'
import { Protected, PrivateRoute } from './privateroute.jsx'

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
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
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