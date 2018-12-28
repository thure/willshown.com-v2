import express from 'express'
import * as admin from 'firebase-admin'

// Initialize Firebase
admin.initializeApp(/* This is configured automatically from the envfile. */)
import accessCodes from '../config/access-codes.json'

const router = express.Router()

router.post('/login', (req, res) => {
  const requestCode = req.body.accessCode

  const user = accessCodes.find(({ accessCode }) => accessCode === requestCode)

  if (user) {
    admin
      .auth()
      .createCustomToken(requestCode)
      .then(token =>
        res.json({
          token,
          user,
        })
      )
      .catch(err => {
        console.log('[server/auth POST login]', 'error', err)
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(401)
  }
})

export const verifyAccessToken = accessToken =>
  admin
    .auth()
    .verifyIdToken(accessToken)
    .then(({ uid }) => admin.auth().getUser(uid))

export default router
