// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

export default function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      console.log("trying to register the service worker");
      navigator.serviceWorker.register('').then(function registration() {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // Registration failed
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}
