// This is a simple service worker
const CACHE_NAME = 'learn-homeward-ruin-elite-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico'
  // Don't hardcode JS filenames as they may change with each build
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Use individual cache.put operations instead of cache.addAll
        // This allows us to continue even if some resources fail
        const cachePromises = urlsToCache.map(url => {
          return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              return cache.put(url, response);
            })
            .catch(error => {
              console.warn(`Failed to cache ${url}: ${error.message}`);
              // Continue despite the error
              return Promise.resolve();
            });
        });
        
        return Promise.all(cachePromises)
          .then(() => {
            console.log('Caching completed successfully');
            // Notify all clients that caching is complete
            return self.clients.matchAll();
          })
          .then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'CACHE_COMPLETE',
                timestamp: new Date().getTime()
              });
            });
            return self.skipWaiting();
          });
      })
  );
});

// Activate and claim clients so the page is controlled immediately
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
