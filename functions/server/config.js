import express from 'express'
import set from 'lodash/set'
import Storage from '@google-cloud/storage'
import serviceConfig from '../config/service-credentials.json'
import clientConfig from '../app/src/config/client-credentials.json'

const router = express.Router()

const storageClient = new Storage({
  projectId: serviceConfig.project_id,
  credentials: {
    client_email: serviceConfig.client_email,
    private_key: serviceConfig.private_key,
  },
})

const bucket = storageClient.bucket(clientConfig.storageBucket)

const getSignedURLsForPrivatePortfolio = privatePortfolioWithoutSrc => {
  const assets = privatePortfolioWithoutSrc.assets

  const signedURLConfig = {
    action: 'read',
    expires: Date.now() + 72 * 60 * 60 * 1e3, // expire in 72 hours
  }

  const sources = Object.keys(assets).reduce((sources, assetKey) => {
    const asset = assets[assetKey]
    return Object.keys(asset.sources).reduce((sources, sourceKey) => {
      sources.push({
        source: `${assetKey}.sources.${sourceKey}`,
        filePath: asset.sources[sourceKey].path,
      })
      return sources
    }, sources)
  }, [])

  return Promise.all(
    sources.map(({ source, filePath }) => {
      const file = bucket.file(filePath)
      return new Promise((res, rej) => {
        file.getSignedUrl(signedURLConfig, (err, url) => {
          if (err) return rej(err)
          return res({
            source,
            filePath,
            url,
          })
        })
      })
    })
  ).then(resolvedSources => {
    return resolvedSources.reduce((privatePortfolio, resolvedSource) => {
      return set(privatePortfolio, `assets.${resolvedSource.source}`, {
        path: resolvedSource.filePath,
        src: resolvedSource.url,
      })
    }, privatePortfolioWithoutSrc)
  })
}

export const getPrivatePortfolio = () => {
  return bucket
    .file('/config/portfolio.private.json')
    .download()
    .then(data => JSON.parse(data[0]))
    .then(getSignedURLsForPrivatePortfolio)
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
