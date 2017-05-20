import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SIGNUP } from '../actions.js'
import RestHelper from '../resthelper.js'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.userChanged = evt => this.setState({ username: evt.target.value })
        this.pwChanged = evt => this.setState({ password: evt.target.value })
        this.register = () => this.props.dispatch({ type: SIGNUP, user: this.state.username });

        this.signup = (evt) => {
            evt.preventDefault();

            // send in ajax request
            RestHelper.post('/auth/signup', {username: this.state.username, password: this.state.password})
                .then(() => {
                    this.register()
                    this.props.history.push('/')
                })
                .catch((err) => console.log(err))
            }
    }

    render() {
        // TODO reroute to home if already signed in
        return <div>
            <h3>Register</h3>
            <form role="form" action="/auth/signup" method="post" onSubmit={this.signup}>
            <input type="text" name="username" onChange={this.userChanged} value={this.state.username} placeholder="Choose a Username" />
            <input type="password" name="password" onChange={this.pwChanged} value={this.state.password} placeholder="Choose a Password" />
            <button type="submit">Sign Up</button>
            </form>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

module.exports = withRouter(connect(mapStateToProps)(Register))

