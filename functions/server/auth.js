import express from 'express'
import { COOKIE_KEY } from '../app/src/modules/auth'

import accessCodes from '../config/access-codes.json'
import { getPrivatePortfolio } from './config'

const router = express.Router()

const cookieConfig = {
  maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
}

const resolveUserFromAccessCode = requestCode =>
  accessCodes.find(({ accessCode }) => accessCode === requestCode)

router.post('/login', (req, res) => {
  const user = resolveUserFromAccessCode(req.body.accessCode)

  if (user) {
    res.cookie(COOKIE_KEY, JSON.stringify(user), cookieConfig)
    getPrivatePortfolio().then(privatePortfolio => {
      res.json({
        user,
        privatePortfolio,
      })
    })
  } else {
    res.sendStatus(401)
  }
})

export const establishReqUser = (req, res, next) => {
  req.user = null

  if (COOKIE_KEY in req.cookies) {
    const cookieUser = JSON.parse(req.cookies[COOKIE_KEY])
    if (
      cookieUser.accessCode &&
      resolveUserFromAccessCode(cookieUser.accessCode)
    )
      req.user = cookieUser
    else res.clearCookie(COOKIE_KEY)
    return next()
  } else if (req.query && req.query.hasOwnProperty('code')) {
    const user = resolveUserFromAccessCode(req.query.code)
    if (user) {
      res.cookie(COOKIE_KEY, JSON.stringify(user), cookieConfig)
      req.user = user
    }
    return next()
  } else return next()
}

export default router
