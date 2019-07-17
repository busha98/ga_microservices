const express = require('express')
const app = express()
const { checkGoogleAnalyticsTokenExpiration } = require('./helpers/google/refreshAccessToken')
const { analytics } = require('./helpers/google/analytics')

require('dotenv').config()

const {
  ids,
  access_token,
  token_uri,
  refresh_token,
  client_id,
  client_secret,
  expires_in
} = process.env

app.set('googleAnalytics', {
  ids,
  access_token,
  token_uri,
  refresh_token,
  client_id,
  client_secret,
  expires_in
})

app.get('/analytics', async function (req, res) {
  const {
    startDate='30daysAgo',
    endDate='today',
    filters='ga:pagePath=@blog/'
  } = req.query
  
  const { ids, access_token } = app.get('googleAnalytics')
  const metrics = 'ga:uniquePageviews'
  const dimensions = 'ga:pagePath'

  await checkGoogleAnalyticsTokenExpiration(app);
  await analytics(ids, startDate, endDate, metrics, access_token, dimensions, filters)
    .then(data => res.send(data))
    .catch(err => res.send(err))
})

app.get('/ping', function (req, res) {
  const {version} = require('./package.json')
  res.send(JSON.stringify({version}))
})
 
app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`)
})