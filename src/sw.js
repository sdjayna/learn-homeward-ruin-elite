// This is a simple service worker
const CACHE_NAME = 'learn-homeward-ruin-elite-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/main-DGCLVVKX.js',
  '/polyfills-FFHMD2TL.js',
  '/styles-5INURTSO.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => {
            // Notify all clients that caching is complete
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                client.postMessage({
                  type: 'CACHE_COMPLETE',
                  timestamp: new Date().getTime()
                });
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
