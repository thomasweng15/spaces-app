import { connect } from 'react-redux'
import { AUTHENTICATE } from '../actions.js'
import RestHelper from '../resthelper.js'
import Login from '../components/login.jsx'

const mapStateToProps = state => {
    return {
        signedIn: state.user != null
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (username, password) => {
          RestHelper.post('/auth/signin', {username: username, password: password})
          .then(() => {
            dispatch({ type: AUTHENTICATE, user: username })
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
