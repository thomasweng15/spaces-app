import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SIGNUP } from '../actions.js'
import RestHelper from '../resthelper.js'
import Register from '../components/register.jsx'

const mapStateToProps = state => {
    return {
        signedIn: state.user != null
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (username, password, redirect) => {
          RestHelper.post('/auth/signup', {username: username, password: password})
          .then(() => {
            dispatch({ type: SIGNUP, user: username })
            redirect()
          })
          .catch((err) => console.log(err));
        }
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default RegisterContainer