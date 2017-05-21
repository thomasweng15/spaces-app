import React, { PropTypes } from 'react'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
    }

    this.onUsernameChanged = evt => this.setState({ username: evt.target.value })
    this.onPasswordChanged = evt => this.setState({ password: evt.target.value })
    this.redirect = () => this.setState({ redirectToReferrer: true });
    this.authenticate = (e) => {
      e.preventDefault()
      this.props.onSubmit(this.state.username, this.state.password, this.redirect)
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { username, password, redirectToReferrer } = this.state

    if (redirectToReferrer) {
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
    onSubmit: PropTypes.func.isRequired
}

export default Login
