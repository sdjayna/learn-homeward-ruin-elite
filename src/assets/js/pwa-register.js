// This is a simple service worker registration script
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Check if there's an update to the service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Service Worker update found!');
          
          newWorker.addEventListener('statechange', () => {
            console.log('Service Worker state changed to:', newWorker.state);
          });
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
        // Update the status banner with the error
        if (document.getElementById('pwa-status')) {
          document.getElementById('pwa-status').innerHTML = 'Service Worker registration failed: ' + error;
          document.getElementById('pwa-status').style.backgroundColor = '#f8d7da';
          document.getElementById('pwa-status').style.color = '#721c24';
        }
      });
  });
}
