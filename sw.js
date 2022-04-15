self.addEventListener('install', function(event) {
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

/* Network first */
self.addEventListener('fetch', function (event) {
    return networkFirst(event);
});