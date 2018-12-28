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

const pickUser = ({
  uid,
  displayName,
  photoURL,
  email,
  emailVerified,
  phoneNumber,
  isAnonymous,
  providerData,
  apiKey,
  appName,
  authDomain,
  stsTokenManager,
  redirectEventId,
  lastLoginAt,
  createdAt,
}) => ({
  uid,
  displayName,
  photoURL,
  email,
  emailVerified,
  phoneNumber,
  isAnonymous,
  providerData,
  apiKey,
  appName,
  authDomain,
  stsTokenManager,
  redirectEventId,
  lastLoginAt,
  createdAt,
})

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

    auth()
      .currentUser.getIdToken()
      .then(accessToken => Cookies.set(COOKIE_KEY, { accessToken }))

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

export const establishCurrentUser = () => dispatch =>
  new Promise(resolve => {
    const user = auth().currentUser

    console.log('[establishCurrentUser]', user)

    if (user) {
      dispatch(setCurrentUser(user))
      resolve(user)
    } else {
      return dispatch(loginUser('wss_i6]k[p7v'))
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
      auth()
        .signInWithCustomToken(token)
        // apparently only the client can update the profile, so…
        .then(() =>
          auth().currentUser.updateProfile({
            displayName: user.displayname,
          })
        )
        .then(() => pickUser(auth().currentUser))
    )
    .then(user => {
      console.log('[loginUser]', 'success', user)
      dispatch(setCurrentUser(user))
      return user
    })
    .catch(err => console.log('[loginUser]', 'error', err))

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
