const CACHE_NAME = 'aiml-club-v3';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/aiml-club-logo-new.png',
    '/college-logo-new.png',
    '/favicon.ico'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        })
    );
    self.clients.claim();
});

// Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const fetchedResponse = fetch(event.request).then((networkResponse) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                }).catch(() => cachedResponse);

                return cachedResponse || fetchedResponse;
            });
        })
    );
});

// Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const path = event.notification.data?.path || '/';
    const fullPath = self.location.origin + path;

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === fullPath && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(fullPath);
        })
    );
});

// Background Sync Placeholder
self.addEventListener('sync', (event) => {
    if (event.tag === 'form-sync') {
        console.log('[SW] Handling background sync for forms');
        // Logic for syncing offline form submissions would go here
    }
});

// Push Event
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'AIML Club OCT';
    const options = {
        body: data.body || 'New updates from the club!',
        icon: '/aiml-club-logo-new.png',
        badge: '/aiml-club-logo-new.png',
        data: { path: data.path || '/' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
