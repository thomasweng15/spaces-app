import React from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
} from 'react-router-dom'
import { AUTHENTICATE } from '../modules/actions.js'
import RestHelper from '../modules/resthelper.js'

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

    this.authenticate = () => {
      this.props.dispatch({ type: AUTHENTICATE, user: this.state.username })
    }

    this.auth = (evt) => {
      evt.preventDefault();

      // send in ajax request
      RestHelper.post('/auth/signin', {username: this.state.username, password: this.state.password})
        .then(() => {
          this.authenticate()
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

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

module.exports = connect(mapStateToProps)(Login)