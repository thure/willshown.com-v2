import express from 'express'
import { COOKIE_KEY } from '../app/src/modules/auth'

import accessCodes from '../config/access-codes.json'

const router = express.Router()

router.post('/login', (req, res) => {
  const requestCode = req.body.accessCode

  const user = accessCodes.find(({ accessCode }) => accessCode === requestCode)

  if (user) {
    res.json({
      user,
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
