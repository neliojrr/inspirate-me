var CACHE_NAME = 'my-pwa-cache-v11';
var urlsToCache = [
  '/',
  '/build.js',
  '/static/js/bundle.js'
];

self.addEventListener('install', function(event) {
  console.log("event install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.addAll(urlsToCache);
        /*return Promise.all([
          getQuotes(),
          cache
        ]);*/
      })
    /*.then(function(response) {
        const quotes = response[0] || [];
        const cache = response[1] || {};
        cache.put("quotes", quotes);
      })
      .catch(function(err) {
        console.log("Error: " + err);
      })*/
  );
});

self.addEventListener('fetch', function(event) {
  console.log("Fetch event");
  var requestURL = new URL(event.request.url);
  if(requestURL == "https://cors-anywhere.herokuapp.com/https://favqs.com/api/quotes") {
    console.log("trying to fetch");
    event.respondWith(quoteResponse(event.request));
  }
});

function quoteResponse(request) {
  console.log("quoteResponse");
    return fetch(request).then(function(response) {
      if(response.status == 200) {
        console.log("it was 200");
        caches.open(CACHE_NAME)
          .then(function(cache) {
            return Promise.all([
              getQuotes(),
              cache
            ]);
          })
          .then(function(response) {
            const quotes = response[0] || [];
            const cache = response[1] || {};
            cache.put("quotes", quotes);
          })
          .catch(function(err) {
            console.log("Error: " + err);
          });

        // Return response from the first request
        return response.clone();
      }
      else {
        // Throw an error to try to render from the cache
        throw new Error();
      }
    })
    .catch(function(err) {
      console.log("trying to render cache response");
      return caches.match("quotes").then(function(response) {
        if(response) {
          return response;
        };
      });
    });
}

function getQuotes() {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  console.log("get quotes");
  return(
    fetch(proxyURL + 'https://favqs.com/api/quotes',
      {
        headers: { 'Authorization': 'Token token="43d6ba8555e5b64e6d0c8e9d7eb9a563"' }
      }
    )
  );
}
