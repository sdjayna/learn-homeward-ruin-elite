// This is a simple service worker
const CACHE_NAME = 'learn-homeward-ruin-elite-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico'
  // Don't hardcode JS filenames as they may change with each build
];

// Language-specific resources
const languageResources = {
  en: [
    '/assets/i18n/en.json'
  ],
  fr: [
    '/assets/i18n/fr.json'
  ],
  es: [
    '/assets/i18n/es.json'
  ]
};

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
        
        // Detect user's preferred language from browser settings
        const userLang = self.navigator?.language?.split('-')[0] || 'en';
        const langToCache = ['en', 'fr', 'es'].includes(userLang) ? userLang : 'en';
        console.log('[Service Worker] Detected browser language:', userLang, '→ Caching resources for:', langToCache);
        
        // Cache language-specific resources
        if (languageResources[langToCache] && languageResources[langToCache].length > 0) {
          const langCachePromises = languageResources[langToCache].map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch language resource ${url}`);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.warn(`Failed to cache language resource ${url}: ${error.message}`);
                return Promise.resolve();
              });
          });
          
          cachePromises.push(...langCachePromises);
        }
        
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
                timestamp: new Date().getTime(),
                language: langToCache
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

// Listen for language change messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'LANGUAGE_CHANGED') {
    const lang = event.data.language;
    
    // Cache language-specific resources if they exist
    if (languageResources[lang] && languageResources[lang].length > 0) {
      caches.open(CACHE_NAME).then(cache => {
        languageResources[lang].forEach(url => {
          fetch(url).then(response => {
            if (response.ok) {
              cache.put(url, response);
              console.log(`[Service Worker] Updated cache for language resource: ${url}`);
            }
          }).catch(error => {
            console.warn(`Failed to cache language resource ${url}: ${error.message}`);
          });
        });
      });
    }
  } else if (event.data && event.data.type === 'SKIP_WAITING') {
    // Force the waiting service worker to become active
    self.skipWaiting();
  }
});

// Periodic background sync to update cache
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

// Function to update cache in the background
async function updateCache() {
  console.log('[Service Worker] Performing background cache update');
  const cache = await caches.open(CACHE_NAME);
  
  // Update core files
  for (const url of urlsToCache) {
    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (response.ok) {
        await cache.put(url, response);
        console.log(`[Service Worker] Updated cache for: ${url}`);
      }
    } catch (error) {
      console.warn(`[Service Worker] Failed to update cache for ${url}: ${error.message}`);
    }
  }
  
  // Update language resources for current language
  const userLang = self.navigator?.language?.split('-')[0] || 'en';
  const langToUpdate = ['en', 'fr', 'es'].includes(userLang) ? userLang : 'en';
  
  if (languageResources[langToUpdate]) {
    for (const url of languageResources[langToUpdate]) {
      try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (response.ok) {
          await cache.put(url, response);
          console.log(`[Service Worker] Updated cache for language resource: ${url}`);
        }
      } catch (error) {
        console.warn(`[Service Worker] Failed to update language resource ${url}: ${error.message}`);
      }
    }
  }
  
  console.log('[Service Worker] Background cache update complete');
}
