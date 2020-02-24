const cache_name = 'mws-cache-v1';

//List of URLs to be cached
const urlsToCache = [
  './',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg',
  './img/5.jpg', '/img/6.jpg', '/img/7.jpg', '/img/8.jpg',
  '/img/9.jpg', '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  '//normalize-css.googlecode.com/svn/trunk/normalize.css'
];

//Install the server worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cache_name)
    .then(cache => {
      console.log('Opend cache');
      return cache.addAll(urlsToCache);
    })
  );
});

//Update the server worker
self.addEventListener('activate', event => {
  let cacheWhitelist = ['mws-cache-v2'];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if(response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
