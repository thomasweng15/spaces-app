import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'

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
      </Switch>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const WelcomeHeader = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component }) => (
  <Route render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Home = () => <h3>Home</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    }

    this.login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true })
      })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        { from ? <p>You must log in to view the page at {from.pathname}</p> : null }
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default App