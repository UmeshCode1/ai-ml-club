const CACHE_NAME = 'aiml-club-v2';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/aiml-club-logo-new.png',
    '/college-logo-new.png',
    '/favicon.ico'
];

// Install Event - Pre-cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate Event - Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Cleaning old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const fetchedResponse = fetch(event.request).then((networkResponse) => {
                    // Cache the new response
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                }).catch(() => {
                    // If network fails, return cached response if available
                    return cachedResponse;
                });

                return cachedResponse || fetchedResponse;
            });
        })
    );
});

// Push Notification Placeholder
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'AIML Club OCT';
    const options = {
        body: data.body || 'New updates from the club!',
        icon: '/aiml-club-logo-new.png',
        badge: '/aiml-club-logo-new.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
