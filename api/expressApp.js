const express = require('express')
const app = express()
const port = 5000

app.listen(port, () => console.log('API listening on port' + port))

module.exports = app