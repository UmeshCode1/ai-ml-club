const CACHE_NAME = 'aiml-club-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/aiml-club-logo-new.png',
    '/college-logo-new.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
