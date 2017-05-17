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

const authStore = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signout(cb) {
    this.isAuthenticated = false;
    if (cb) cb();
  }
}

const WelcomeHeader = withRouter(({ history }) => (
  authStore.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        get("auth/signout")
          .then(() => authStore.signout(() => history.push('/')))
          .catch((err) => console.log(err));
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component }) => (
  <Route render={props => (
    authStore.isAuthenticated ? (
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

function requestBuildQueryString(params) {
  var queryString = [];
  for(var property in params)
    if (params.hasOwnProperty(property)) {
      queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
    }
  return queryString.join('&');
}

function post(url, data) {
  return new Promise(function(success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      success();
    };

    xhr.onerror = error;
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(requestBuildQueryString(data));
  })
}

function get(url) {
  return new Promise(function(success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      success();
    };

    xhr.onerror = error;
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();
  })
}

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
      post('/auth/signin', {username: this.state.username, password: this.state.password})
        .then((data) => {
          //  localStorage.token = data.token
          authStore.authenticate();
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