const CACHE_NAME = 'v0.1'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/timeclock/',
        '/timeclock/index.html',
        '/timeclock/main.js'
      ])
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => {
            return key.indexOf(CACHE_NAME) !== 0
          })
          .map(key => {
            return caches.delete(key)
          })
      )
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request)
    })
  )
})
