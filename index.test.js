const searchLogos = require('./index')

test('\'searchLogos\' for github ', async () => {
  const logos = await searchLogos('github')
  expect(logos.entity).toBe('GitHub')
  expect(logos.logoUrls).toHaveLength(3)
})

test('\'searchLogos\' for universidad javeriana ', async () => {
  const logos = await searchLogos('universidad javeriana')
  expect(logos.entity).toBe('Pontifical Xavierian University')
  expect(logos.logoUrls).toHaveLength(1)
})

test('\'searchLogos\' for empty query ', async () => {
  const logos = await searchLogos('')
  expect(logos.entity).toBe('')
  expect(logos.logoUrls).toHaveLength(0)
})
