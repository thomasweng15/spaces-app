/*
 * action types
 */

export const AUTHENTICATE = 'AUTHENTICATE'
export const SIGNOUT = 'SIGNOUT'

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