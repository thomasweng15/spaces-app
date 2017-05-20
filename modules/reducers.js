import { AUTHENTICATE, SIGNOUT, SIGNUP } from '../modules/actions.js'

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return Object.assign({}, state, {
        user: action.user
      })
    case SIGNOUT:
      return Object.assign({}, state, {
        user: null
      })
    case SIGNUP:
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}