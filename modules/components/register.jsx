import React from 'react'
import { Redirect } from 'react-router-dom'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: false
        }

        this.usernameChanged = evt => this.setState({ username: evt.target.value })
        this.passwordChanged = evt => this.setState({ password: evt.target.value })
        this.redirect = () => this.setState({ redirect: true })
        this.register = (e) => {
            e.preventDefault()
            this.props.onSubmit(this.state.username, this.state.password, this.redirect)
        }
    }

    render() {
        const { username, password, redirect } = this.state

        if (redirect) {
            return <Redirect to={{ pathname: '/' }}/>
        }

        return <div>
            <h3>Register</h3>
            <form role="form" action="/auth/signup" method="post" onSubmit={e => this.register(e)}>
                <input type="text" name="username" onChange={this.usernameChanged} value={username} placeholder="Choose a Username" />
                <input type="password" name="password" onChange={this.passwordChanged} value={password} placeholder="Choose a Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    }
}

export default Register