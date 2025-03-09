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
  // Clear old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('[Service Worker] Removing old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('[Service Worker] Claiming clients for version', CACHE_NAME);
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Network-first strategy with cache fallback
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Clone the response before using it
        const responseToCache = networkResponse.clone();
        
        // Update the cache with the fresh version
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
          console.log('[Service Worker] Updated cache for:', event.request.url);
        });
        
        return networkResponse;
      })
      .catch(error => {
        console.log('[Service Worker] Network request failed, falling back to cache for:', event.request.url);
        
        // If network fails, try to get from cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If not in cache either, return a basic offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          // For other resources, just fail
          throw error;
        });
      })
  );
});
