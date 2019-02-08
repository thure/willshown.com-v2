import fetch from 'cross-fetch'
import Cookies from 'js-cookie'

export const COOKIE_KEY = '__session'

export const AUTHENTICATE = 'auth/AUTHENTICATE'
export const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'
export const SET_PRIVATE_PORTFOLIO = 'auth/SET_PRIVATE_PORTFOLIO'

const cookiesConfig = {
  expires: 3,
}

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  privatePortfolio: null,
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

    case SET_PRIVATE_PORTFOLIO:
      return {
        ...state,
        privatePortfolio: action.privatePortfolio,
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

export const setPrivatePortfolio = privatePortfolio => dispatch =>
  new Promise(resolve => {
    console.log('[setPrivatePortfolio]', privatePortfolio)
    dispatch({
      type: SET_PRIVATE_PORTFOLIO,
      privatePortfolio,
    })

    resolve(privatePortfolio)
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
    .then(({ user, privatePortfolio }) => {
      Cookies.set(COOKIE_KEY, user, cookiesConfig)
      console.log('[loginUser]', 'success', user)
      dispatch(setCurrentUser(user))
      dispatch(setPrivatePortfolio(privatePortfolio))
      return user
    })

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
