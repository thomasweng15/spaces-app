import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SIGNOUT } from '../actions.js'
import RestHelper from '../resthelper.js'

const Welcome = ({ signedIn, onClick }) => {
    if (signedIn) {
        return <p>
            Welcome! <button onClick={e => {
                e.preventDefault()
                onClick()
            }}>Sign out</button>
        </p>
    }

    return (
        <p>You are not logged in.</p>
    )
}

Welcome.propTypes = {
    signedIn: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        signedIn: state.user != null
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            RestHelper.get("auth/signout")
                .then(() => {
                    dispatch({ type: SIGNOUT });
                    ownProps.history.push('/');
                })
                .catch((err) => console.log(err));
        }
    }
} 

const WelcomeContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome))

export default WelcomeContainer