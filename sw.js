self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open('main').then(function(cache) {
        return cache.addAll(
          [
            '/catalogo/',
            '/catalogo/manifest.json',
            '/catalogo/index.html',
            '/catalogo/style.css',
            '/catalogo/resources/image/page1.webp',
            '/catalogo/resources/image/page2.webp',
            '/catalogo/resources/image/page3.webp',
            '/catalogo/resources/image/page4.webp',
            '/catalogo/resources/image/page5.webp',
            '/catalogo/resources/image/page6.webp',
            '/catalogo/resources/image/page7.webp',
            '/catalogo/assets/favicon-196.png'
          ]
        );
      })
    );
});

/* Network first */
function networkFirst(event){
    event.respondWith(
        fetch(event.request).then(function(response){
          return caches.open('main').then(function(cache){
              cache.put(event.request, response.clone());
              return response;
          })
        }).catch(function() {
            return caches.match(event.request);
        })
    )
}
/* Cache first */
function cacheFirst(event){
  event.respondWith(
    caches.open('main').then(function(cache) {
      return cache.match(event.request).then(function(cacheResponse) {
        if(cacheResponse)
          return cacheResponse
        else
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone())
              return networkResponse
          })
      })
    })
  );
}

self.addEventListener('fetch', function (event) {
    if(event.request.url.includes('resources'))
      return cacheFirst(event);
    else
      return networkFirst(event);
});