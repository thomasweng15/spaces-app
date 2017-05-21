import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Protected from './protected.jsx'

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Route render={props => (
            this.props.user ? (
                <Protected props={this.props.component}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
        )}/>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

module.exports = connect(mapStateToProps)(PrivateRoute)