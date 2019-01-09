import express from 'express'
import { Storage } from '@google-cloud/storage'
import serviceConfig from '../config/service-credentials.json'
import clientConfig from '../app/src/config/client-credentials.json'

const router = express.Router()

// fucking why, Google. Why is there no `firebase.storage` for Node?
const storage = new Storage({
  projectId: serviceConfig.project_id,
  credentials: {
    client_email: serviceConfig.client_email,
    private_key: serviceConfig.private_key,
  },
})

export const getPrivatePortfolio = () => {
  return storage
    .bucket(clientConfig.storageBucket)
    .file('/config/portfolio.private.json')
    .download()
    .then(data => JSON.parse(data[0]))
}

router.get('/portfolio.private.json', (req, res) => {
  if (req.user) {
    return getPrivatePortfolio()
      .then(data => res.json(data))
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
