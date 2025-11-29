// Notification utilities for managing browser notifications

export type NotificationPermissionStatus = 'granted' | 'denied' | 'default';

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return 'denied';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission === 'denied') {
        return 'denied';
    }

    try {
        const permission = await Notification.requestPermission();
        return permission as NotificationPermissionStatus;
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return 'denied';
    }
}

/**
 * Check current notification permission status
 */
export function getNotificationPermission(): NotificationPermissionStatus {
    if (!('Notification' in window)) {
        return 'denied';
    }
    return Notification.permission as NotificationPermissionStatus;
}

/**
 * Check if notifications are supported
 */
export function isNotificationSupported(): boolean {
    return 'Notification' in window;
}

/**
 * Show a notification
 */
export async function showNotification(
    title: string,
    options?: NotificationOptions
): Promise<void> {
    if (!isNotificationSupported()) {
        console.warn('Notifications not supported');
        return;
    }

    const permission = getNotificationPermission();
    if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
    }

    try {
        // Try to use service worker notification if available
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(title, {
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                ...options,
            });
        } else {
            // Fallback to regular notification
            new Notification(title, {
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                ...options,
            });
        }
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

/**
 * Show a celebration reminder notification
 */
export async function showCelebrationNotification(
    celebrationName: string,
    celebrationDate: string,
    daysCount: number
): Promise<void> {
    await showNotification('🎉 Celebration Reminder!', {
        body: `${celebrationName} is coming up! It will be ${daysCount.toLocaleString()} days since ${celebrationDate}.`,
        tag: `celebration-${celebrationDate}-${daysCount}`,
        requireInteraction: false,
        data: {
            url: '/',
            celebrationDate,
            daysCount,
        },
    });
}
