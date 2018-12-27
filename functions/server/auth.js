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
  } else {
    res.sendStatus(401)
  }
})

export const firebaseAuth = () => admin.auth()

export default router
