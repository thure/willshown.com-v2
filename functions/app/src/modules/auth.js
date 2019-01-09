import fetch from 'cross-fetch'
import Cookies from 'js-cookie'

export const COOKIE_KEY = 'willshown'

export const AUTHENTICATE = 'auth/AUTHENTICATE'
export const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'

const initialState = {
  isAuthenticated: false,
  currentUser: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.authenticated,
      }

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      }

    default:
      return state
  }
}

export const setCurrentUser = user => dispatch =>
  new Promise(resolve => {
    console.log('[setCurrentUser]', user)

    dispatch({
      type: SET_CURRENT_USER,
      user,
    })

    dispatch({
      type: AUTHENTICATE,
      authenticated: true,
    })

    resolve(user)
  })

export const setCurrentUserFromCookie = user => dispatch =>
  new Promise(resolve => {
    console.log('[setCurrentUserFromCookie]', user)

    dispatch({
      type: SET_CURRENT_USER,
      user,
    })

    dispatch({
      type: AUTHENTICATE,
      authenticated: true,
    })

    resolve(user)
  })

export const establishCurrentUser = (isAuthenticated, user) => dispatch => {
  if (isAuthenticated && user) {
    console.log('[establishCurrentUser]', 'logged in')
    return dispatch(setCurrentUser(user))
  } else {
    // console.log('[establishCurrentUser]', 'logging in with default profile')
    // return dispatch(loginUser('wss_i6]k[p7v'))
    return dispatch(logoutUser())
  }
}

export const loginUser = accessCode => dispatch =>
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessCode }),
  })
    .then(res => res.json())
    .then(({ user }) => {
      Cookies.set(COOKIE_KEY, user)
      console.log('[loginUser]', 'success', user)
      dispatch(setCurrentUser(user))
      return user
    })
    .catch(err => console.log('[loginUser]', 'error', err))

export const logoutUser = () => dispatch =>
  new Promise(resolve => {
    console.log('[logoutUser]')
    dispatch({
      type: AUTHENTICATE,
      authenticated: false,
    })

    dispatch({
      type: SET_CURRENT_USER,
      user: {},
    })

    Cookies.remove(COOKIE_KEY)
    resolve({})
  })
