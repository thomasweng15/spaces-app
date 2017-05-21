import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SIGNOUT } from '../actions.js'
import RestHelper from '../resthelper.js'
import Welcome from '../components/welcome.jsx'

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