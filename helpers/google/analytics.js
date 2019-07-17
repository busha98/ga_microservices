const request = require('request-promise')

const analytics = (ids, startDate, endDate, metrics, token, dimensions, filters) => {
  const url = 'https://www.googleapis.com/analytics/v3/data/ga'
  return request({
    url,
    method: 'GET',
    qs: {
      'ids': ids,
      'start-date': startDate,
      'end-date': endDate,
      'metrics': metrics,
      'dimensions': dimensions,
      'filters': filters,
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    json: true,
  })
}

module.exports = {
  analytics,
}
