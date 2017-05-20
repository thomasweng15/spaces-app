/*
 * action types
 */

export const AUTHENTICATE = 'AUTHENTICATE'
export const SIGNOUT = 'SIGNOUT'
export const SIGNUP = 'SIGNUP'

/*
 * action creators
 */

function authenticate(user) {
  return {
    type: AUTHENTICATE,
    user: user
  }
}

function signout() {
  return {
    type: SIGNOUT
  }
}

function signup(user) {
  return {
    type: SIGNUP,
    user: user
  }
}