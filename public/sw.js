const CACHE_NAME = 'aiml-club-v8-perfection';
const OFFLINE_URL = '/offline';

const STATIC_ASSETS = [
    '/',
    OFFLINE_URL,
    '/manifest.json',
    '/aiml-club-logo-new.png',
    '/college-logo-new.png',
    '/favicon.ico'
];

// Handle SKIP_WAITING message
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            // Enable navigation preload if supported
            'navigationPreload' in self.registration ? self.registration.navigationPreload.enable() : Promise.resolve(),
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME) return caches.delete(cache);
                    })
                );
            })
        ])
    );
    self.clients.claim();
});

// Stale-While-Revalidate with Navigation Preload and Offline Fallback
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const isNavigation = event.request.mode === 'navigate';

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        // Try navigation preload first
        if (isNavigation) {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    // Update cache in background
                    event.waitUntil(cache.put(event.request, preloadResponse.clone()));
                    return preloadResponse;
                }
            } catch (e) {
                console.log('[SW] Navigation preload failed:', e);
            }
        }

        // Network first (with background cache update) for navigation, otherwise stale-while-revalidate
        const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200 && event.request.url.startsWith(self.location.origin)) {
                cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
        }).catch(async () => {
            // If network fails, return cached response
            if (cachedResponse) return cachedResponse;

            // If both fail and it's a navigation request, show the offline page
            if (isNavigation) {
                return cache.match(OFFLINE_URL);
            }
        });

        // For navigation, wait for network if no preload, otherwise return cached immediately for stale-while-revalidate
        return (isNavigation && !cachedResponse) ? fetchPromise : (cachedResponse || fetchPromise);
    })());
});

// Background Sync for offline form submissions
self.addEventListener('sync', (event) => {
    console.log('[SW] Background Sync Event:', event.tag);
    if (event.tag === 'sync-suggestions' || event.tag === 'form-sync') {
        event.waitUntil(handleSyncData());
    }
});

// Periodic Sync for content updates
self.addEventListener('periodicsync', (event) => {
    console.log('[SW] Periodic Sync Event:', event.tag);
    if (event.tag === 'content-update') {
        event.waitUntil(updateContent());
    }
});

async function handleSyncData() {
    console.log('[SW] Handling sync data...');
    // In a real app, you'd fetch pending data from IndexedDB and send it to the server
    return Promise.resolve();
}

async function updateContent() {
    console.log('[SW] Updating content in background...');
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(['/events', '/team']); // Refresh core pages
}

// Push Notifications
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'AIML Club OCT';
    const options = {
        body: data.body || 'New updates from the club!',
        icon: '/aiml-club-logo-new.png',
        badge: '/aiml-club-logo-new.png',
        data: { path: data.path || '/' },
        vibrate: [100, 50, 100],
        actions: [
            { action: 'open', title: 'View Now' },
            { action: 'close', title: 'Dismiss' }
        ]
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle Notification Clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

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
