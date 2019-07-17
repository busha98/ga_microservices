const express = require('express')
const app = express()

require('dotenv').config()


app.get('/ping', function (req, res) {
  const {version} = require('./package.json')
  res.send(JSON.stringify({version}))
})
 
app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`)
})