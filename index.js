const wikifetch = require('./wikifetch')
const wikiSearchUrl = '&format=json&list=search&utf8=&srsearch='
const wikiParsedUrl = '&prop=text&formatversion=2&format=json&page='
const getUrls = require('get-urls')
const logoStrings = require('./logosStrings.json')
const exclusionStrings = require('./exclusionStrings.json')

function isLogoUrl (url) {
  const urlLowerCase = url.toLowerCase()
  const matchPattern = new RegExp(`${logoStrings.join('|')}`)
  const noMatchPattern = new RegExp(`${exclusionStrings.join('|')}`)
  return urlLowerCase.match(matchPattern) 
    && !urlLowerCase.match(noMatchPattern) 
    && urlLowerCase.includes('upload.wikimedia.org')
}

function postFilter (query, urls) {
  const queryLowerCase = query.toLowerCase()
  const urlswithQuery = urls.filter(url => url.toLowerCase().includes(queryLowerCase))
  return urlswithQuery.length > 0 ? urlswithQuery : urls

}

async function fetchExtractLogos (query) {
  const res = await wikifetch(wikiParsedUrl, 'parse', query)
  if (!res.parse.text) {
    return []
  }
  const urls = getUrls(res.parse.text)
  const logoUrls = Array.from(urls).filter(x => isLogoUrl(x))
  return {entity: query, logoUrls: postFilter(query, logoUrls)}
}

async function searchForTitle (query) {
  if (!query) return
  const hits = await wikifetch(wikiSearchUrl, 'query', query)
  if (hits.query.search.length > 0) {
    return hits.query.search[0].title
  }
}

async function fetchSearchLogos (query) {
  const title = await searchForTitle(query)
  if (title) {
    const results = await fetchExtractLogos(title)
    return results
  } else {
    return {entity: '', logoUrls: []}
  }
}

module.exports = fetchSearchLogos
