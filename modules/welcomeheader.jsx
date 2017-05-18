import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SIGNOUT } from '../modules/actions.js'
import RestHelper from '../modules/resthelper.js'

class WelcomeHeader extends React.Component {
    constructor(props) {
        super(props)

        this.signout = () => {
            this.props.dispatch({ type: SIGNOUT });
        }
    }

    render() {
        return this.props.user ? (
            <p>
                Welcome! <button onClick={() => {
                    RestHelper.get("auth/signout")
                    .then(() => {
                        this.signout();
                        this.props.router.push('/');
                    })
                    .catch((err) => console.log(err));
                }}>Sign out</button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

module.exports = withRouter(connect(mapStateToProps)(WelcomeHeader))