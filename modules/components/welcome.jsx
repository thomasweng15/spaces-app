import React, { PropTypes } from 'react'

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

export default Welcome
