const { fetch } = require('simple-fetch-cache')
const repand = str => str.replace(/&/gi, ' and ')
const wikiprefix = 'https://en.wikipedia.org/w/api.php'

async function wikiFetch (suffix, action, value) {
  const queryUrl = `${wikiprefix}?action=${action}${suffix}${repand(value)}`
  const res = await fetch(queryUrl, 3600000)
  return res.reply
}

module.exports = wikiFetch
