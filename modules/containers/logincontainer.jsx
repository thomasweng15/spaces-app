import { connect } from 'react-redux'
import { AUTHENTICATE } from '../actions.js'
import RestHelper from '../resthelper.js'
import Login from '../components/login.jsx'

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (username, password, redirect) => {
          RestHelper.post('/auth/signin', {username: username, password: password})
          .then(() => {
            dispatch({ type: AUTHENTICATE, user: username })
            redirect()
          })
          .catch((err) => console.log(err));
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginContainer
