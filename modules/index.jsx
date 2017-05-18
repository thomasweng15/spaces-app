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
import RestHelper from '../modules/resthelper.js'

import { createStore } from 'redux'
import auth from '../modules/reducers.js'

// initial state and reducer
const initialState = {
  user: userData ? userData.username : null
}

// store
let store = createStore(auth, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

var restHelper = new RestHelper();

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
        {/* Add error route */}
      </Switch>
    </div>
  </Router>
)

const WelcomeHeader = withRouter(({ history }) => (
  store.getState().user ? (
    <p>
      Welcome! <button onClick={() => {
        restHelper.get("auth/signout")
          .then(() => {
            store.dispatch({ type: 'SIGNOUT' });
            () => history.push('/'); // TODO make listener
          })
          .catch((err) => console.log(err));
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component }) => (
  <Route render={props => (
    store.getState().user ? (
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
      redirectToReferrer: false,
      username: '',
      password: ''
    }

    this.userChanged = evt => this.setState({ username: evt.target.value });
    this.pwChanged = evt => this.setState({ password: evt.target.value });

    this.auth = (evt) => {
      evt.preventDefault();

      // TODO check for localstorage auth token

      // send in ajax request
      restHelper.post('/auth/signin', {username: this.state.username, password: this.state.password})
        .then((data) => {
          //  localStorage.token = data.token
          store.dispatch({ type: 'AUTHENTICATE', user: this.state.username })
          this.setState({ redirectToReferrer: true })
        })
        .catch((err) => {
          console.log(err);
        });
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
        <form role="form" action="/auth/signin" method="post" onSubmit={this.auth}>
          <input type="text" name="username" onChange={this.userChanged} value={this.state.username} placeholder="Enter Username" />
          <input type="password" name="password" onChange={this.pwChanged} value={this.state.password} placeholder="Enter Password" />
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

export default App