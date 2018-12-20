const functions = require('firebase-functions')

const renderServer = require('./server')

exports.render = functions.https.onRequest(renderServer)
