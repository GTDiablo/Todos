const cacheName = 'todo-app-v1';
const filesToCache = [
    '/',
    'index.html',
    '/static/js/main.chunk.js',
    '/static/js/1.chunk.js',
    '/static/js/bundle.js'
];

self.addEventListener('install', event => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(filesToCache))
            .then(function () {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keyList => Promise.all(keyList.map(key => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            })))
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
})