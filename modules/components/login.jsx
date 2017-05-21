import React, { PropTypes } from 'react'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.onUsernameChanged = evt => this.setState({ username: evt.target.value })
    this.onPasswordChanged = evt => this.setState({ password: evt.target.value })
    this.authenticate = (e) => {
      e.preventDefault()
      this.props.onSubmit(this.state.username, this.state.password, this.redirect)
    }
  }

  render() {
    const {signedIn } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { username, password, redirectToReferrer } = this.state

    if (signedIn) {
      return <Redirect to={from}/>
    }

    return <div>
      { from ? <p>You must log in to view the page at {from.pathname}</p> : null }
      <form role="form" action="/auth/signin" method="post" onSubmit={e => this.authenticate(e)}>
        <input type="text" name="username" onChange={this.onUsernameChanged} value={username} placeholder="Enter Username" />
        <input type="password" name="password" onChange={this.onPasswordChanged} value={password} placeholder="Enter Password" />
        <button type="submit">Log in</button>
      </form>
    </div>
  }
}

Login.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Login
