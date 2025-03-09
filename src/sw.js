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
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Check if this is a request for a language-specific resource
  const url = new URL(event.request.url);
  const langParam = url.searchParams.get('lang');
  
  if (langParam && ['en', 'fr', 'es'].includes(langParam)) {
    // Handle language-specific request
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        // Try to find the language-specific version first
        return cache.match(event.request).then(response => {
          if (response) {
            return response;
          }
          
          // If not in cache, fetch from network
          return fetch(event.request).then(networkResponse => {
            // Cache the response for future use
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Handle regular request
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
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
            }
          }).catch(error => {
            console.warn(`Failed to cache language resource ${url}: ${error.message}`);
          });
        });
      });
    }
  }
});
