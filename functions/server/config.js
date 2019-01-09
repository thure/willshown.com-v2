import express from 'express'
import { Storage } from '@google-cloud/storage'
import serviceConfig from '../config/service-credentials.json'
import clientConfig from '../app/src/config/client-credentials.json'
import { COOKIE_KEY } from '../app/src/modules/auth'

const router = express.Router()

// fucking why, Google. Why is there no `firebase.storage` for Node?
const storage = new Storage({
  projectId: serviceConfig.project_id,
  credentials: {
    client_email: serviceConfig.client_email,
    private_key: serviceConfig.private_key,
  },
})

router.get('/portfolio.public.json', (req, res) => {
  return storage
    .bucket(clientConfig.storageBucket)
    .file('/config/portfolio.public.json')
    .download()
    .then(data => {
      return res.json(JSON.parse(data[0]))
    })
    .catch(err => {
      console.log('[server]', 'get public portfolio', 'error', err)
      return res.sendStatus(500)
    })
})

router.get('/portfolio.private.json', (req, res) => {
  // TODO: make this check more robust and define it as middleware
  if (COOKIE_KEY in req.cookies && JSON.parse(req.cookies[COOKIE_KEY])) {
    return storage
      .bucket(clientConfig.storageBucket)
      .file('/config/portfolio.private.json')
      .download()
      .then(data => {
        return res.json(JSON.parse(data[0]))
      })
      .catch(err => {
        console.log('[server]', 'get private portfolio', 'error', err)
        return res.sendStatus(500)
      })
  } else {
    return res.sendStatus(401)
  }
})

router.get('*', (req, res) => res.sendStatus(404))

export default router
