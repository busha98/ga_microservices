const request = require('request-promise')

const refreshAccessToken = (client_id, client_secret, refresh_token, token_uri) => {
  const url = 'https://developers.google.com/oauthplayground/refreshAccessToken'

  return request({
    method: 'POST',
    url,
    body: { client_id, client_secret, refresh_token, token_uri },
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
  })
}

const checkGoogleAnalyticsTokenExpiration = (app) => {
  const { ids, expires_in, refresh_token, client_id, client_secret, token_uri } = app.get('googleAnalytics')

  if (expires_in > Date.now()) { return }

  return refreshAccessToken(client_id, client_secret, refresh_token, token_uri)
    .then(res => {
      const { access_token, expires_in } = res
      app.set('googleAnalytics', { ids, access_token, token_uri, refresh_token, client_id, client_secret, expires_in: Date.now() + expires_in * 1000 })
    })
}

module.exports = {
  refreshAccessToken,
  checkGoogleAnalyticsTokenExpiration,
}
