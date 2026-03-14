// public/sw.js
// Service Worker — handles push notification display

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Show notification when triggered via showNotification()
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    data.icon    || '/favicon.ico',
      badge:   data.badge   || '/favicon.ico',
      tag:     data.tag     || 'meal-qr',
      vibrate: [100, 50, 100],
      data:    data.url ? { url: data.url } : {},
      actions: data.actions || [],
    })
  );
});

// Open app when notification is clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});