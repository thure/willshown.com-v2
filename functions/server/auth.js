import express from 'express'

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

export default router
