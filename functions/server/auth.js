import express from 'express'
import { COOKIE_KEY } from '../app/src/modules/auth'

import accessCodes from '../config/access-codes.json'
import { getPrivatePortfolio } from './config'

const router = express.Router()

const cookieConfig = {
  maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
}

router.post('/login', (req, res) => {
  const requestCode = req.body.accessCode

  const user = accessCodes.find(({ accessCode }) => accessCode === requestCode)

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
    const user = JSON.parse(req.cookies[COOKIE_KEY])
    if (user) req.user = user
  }

  return next()
}

export default router
