import { auth } from 'firebase'
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

    Cookies.set(COOKIE_KEY, user)

    dispatch({
      type: AUTHENTICATE,
      authenticated: true,
    })

    resolve(user)
  })

export const setCurrentUserFromCookie = (cookie, verifyIdToken) => dispatch => {
  console.log('[setCurrentUserFromCookie]', 'attempt', cookie)

  return verifyIdToken(cookie.token)
    .then(user => {
      console.log('[setCurrentUserFromCookie]', 'success', user)

      dispatch({
        type: SET_CURRENT_USER,
        user,
      })

      dispatch({
        type: AUTHENTICATE,
        authenticated: true,
      })

      return user
    })
    .catch(err => {
      console.log('[setCurrentUserFromCookie]', 'failure', err)

      dispatch({
        type: AUTHENTICATE,
        authenticated: false,
      })

      dispatch({
        type: SET_CURRENT_USER,
        user: {},
      })

      return {}
    })
}

export const establishCurrentUser = () => dispatch =>
  new Promise(resolve => {
    const user = auth().currentUser

    console.log('[establishCurrentUser]', user)

    if (user) {
      dispatch(setCurrentUser(user))
      resolve(user)
    } else {
      resolve({})
    }
  })

export const loginUser = accessCode => dispatch =>
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessCode }),
  })
    .then(res => res.json())
    .then(({ token, user }) =>
      auth().signInWithCustomToken(token, { name: user.name })
    )
    .then(() => {
      const user = auth().currentUser
      console.log('[loginUser]', 'success', user)
      dispatch(setCurrentUser(user))
      return user
    })

export const logoutUser = () => dispatch =>
  auth()
    .signOut()
    .then(() => {
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
      return {}
    })
