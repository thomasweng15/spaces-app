import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const Protected = () => <h3>Protected</h3>

class Wrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <Protected {...this.props} />;
    }
};

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Route render={props => (
            this.props.user ? (
                <Wrapper props={this.props.component}/>
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

module.exports = {
    PrivateRoute: connect(mapStateToProps)(PrivateRoute),
    Protected: Protected
}