;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_ben_10',
  urlsToCache = [
    'http://localhost/pwa%20ben%2010/',
    'http://localhost/pwa%20ben%2010/css/style.css',
    'http://localhost/pwa%20ben%2010/js/script.js',
    'http://localhost/pwa%20ben%2010/img/reloj.png',
    'http://localhost/pwa%20ben%2010/img/favicon/favicon.png'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', function(event) {});



