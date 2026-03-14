// src/lib/useNotification.ts
// Handles service worker registration + notification permission + sending notifications

export type NotifyPayload = {
  title:   string;
  body:    string;
  icon?:   string;
  badge?:  string;
  tag?:    string;
  url?:    string;
  actions?: { action: string; title: string }[];
};

// Register the service worker once
export async function registerSW(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    return reg;
  } catch (err) {
    console.warn('SW registration failed:', err);
    return null;
  }
}

// Ask for permission (returns true if granted)
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied')  return false;

  const result = await Notification.requestPermission();
  return result === 'granted';
}

// Send a local notification via the service worker (works offline too)
export async function sendLocalNotification(payload: NotifyPayload): Promise<void> {
  // Prefer SW-based notification (works on mobile, shows in system tray)
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(payload.title, {
        body:    payload.body,
        icon:    payload.icon   || '/favicon.ico',
        badge:   payload.badge  || '/favicon.ico',
        tag:     payload.tag    || 'hostel-food',
        vibrate: [100, 50, 100],
        data:    { url: payload.url || '/' },
        // @ts-ignore — actions only valid in SW context
        actions: payload.actions || [],
      });
      return;
    } catch {
      // fall through to basic Notification
    }
  }

  // Fallback: basic Notification API
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/favicon.ico',
      tag:  payload.tag  || 'hostel-food',
    });
  }
}