const functions = require('firebase-functions')

const manifest = require('./app/build/asset-manifest.json')

exports.render = functions.https.onRequest((req, res) =>
  res.send(manifest)
)
