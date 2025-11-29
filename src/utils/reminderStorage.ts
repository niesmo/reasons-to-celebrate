// Storage and management for celebration reminders

export type ReminderType = 'same-day' | '1-day' | '7-day';

export interface Reminder {
    id: string;
    celebrationDate: string; // ISO date string of the original date
    celebrationTargetDate: string; // ISO date string of when the celebration occurs
    daysCount: number; // Number of days for the celebration
    celebrationName: string; // e.g., "111 days", "1234 days"
    reminderType: ReminderType;
    createdAt: string; // ISO timestamp
    notified: boolean; // Whether notification has been sent
}

const STORAGE_KEY = 'celebration-reminders';

/**
 * Get all reminders from localStorage
 */
export function getAllReminders(): Reminder[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error reading reminders:', error);
        return [];
    }
}

/**
 * Save a reminder
 */
export function saveReminder(reminder: Omit<Reminder, 'id' | 'createdAt' | 'notified'>): Reminder {
    const reminders = getAllReminders();

    const newReminder: Reminder = {
        ...reminder,
        id: `${reminder.celebrationTargetDate}-${reminder.daysCount}-${reminder.reminderType}`,
        createdAt: new Date().toISOString(),
        notified: false,
    };

    // Check if reminder already exists
    const existingIndex = reminders.findIndex(r => r.id === newReminder.id);
    if (existingIndex >= 0) {
        reminders[existingIndex] = newReminder;
    } else {
        reminders.push(newReminder);
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
        return newReminder;
    } catch (error) {
        console.error('Error saving reminder:', error);
        throw new Error('Failed to save reminder');
    }
}

/**
 * Delete a reminder by ID
 */
export function deleteReminder(id: string): boolean {
    try {
        const reminders = getAllReminders();
        const filtered = reminders.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting reminder:', error);
        return false;
    }
}

/**
 * Check if a reminder exists for a specific celebration
 */
export function hasReminder(
    celebrationTargetDate: string,
    daysCount: number,
    reminderType: ReminderType
): boolean {
    const reminders = getAllReminders();
    const id = `${celebrationTargetDate}-${daysCount}-${reminderType}`;
    return reminders.some(r => r.id === id);
}

/**
 * Get reminder for a specific celebration
 */
export function getReminder(
    celebrationTargetDate: string,
    daysCount: number,
    reminderType: ReminderType
): Reminder | null {
    const reminders = getAllReminders();
    const id = `${celebrationTargetDate}-${daysCount}-${reminderType}`;
    return reminders.find(r => r.id === id) || null;
}

/**
 * Calculate the notification date based on reminder type
 */
export function calculateNotificationDate(
    celebrationDate: Date,
    reminderType: ReminderType
): Date {
    const notificationDate = new Date(celebrationDate);

    switch (reminderType) {
        case 'same-day':
            // Same day at 9 AM
            notificationDate.setHours(9, 0, 0, 0);
            break;
        case '1-day':
            // 1 day before at 9 AM
            notificationDate.setDate(notificationDate.getDate() - 1);
            notificationDate.setHours(9, 0, 0, 0);
            break;
        case '7-day':
            // 7 days before at 9 AM
            notificationDate.setDate(notificationDate.getDate() - 7);
            notificationDate.setHours(9, 0, 0, 0);
            break;
    }

    return notificationDate;
}

/**
 * Get reminders that are due for notification
 */
export function getDueReminders(): Reminder[] {
    const reminders = getAllReminders();
    const now = new Date();

    return reminders.filter(reminder => {
        if (reminder.notified) return false;

        const celebrationDate = new Date(reminder.celebrationTargetDate);
        const notificationDate = calculateNotificationDate(celebrationDate, reminder.reminderType);

        // Check if notification date has passed
        return now >= notificationDate;
    });
}

/**
 * Mark a reminder as notified
 */
export function markAsNotified(id: string): boolean {
    try {
        const reminders = getAllReminders();
        const reminder = reminders.find(r => r.id === id);

        if (!reminder) return false;

        reminder.notified = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
        return true;
    } catch (error) {
        console.error('Error marking reminder as notified:', error);
        return false;
    }
}

/**
 * Clean up old reminders (celebrations that have passed)
 */
export function cleanupOldReminders(): number {
    try {
        const reminders = getAllReminders();
        const now = new Date();

        const active = reminders.filter(reminder => {
            const celebrationDate = new Date(reminder.celebrationTargetDate);
            // Keep reminders for celebrations that haven't passed yet
            return celebrationDate >= now || !reminder.notified;
        });

        const removed = reminders.length - active.length;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(active));
        return removed;
    } catch (error) {
        console.error('Error cleaning up reminders:', error);
        return 0;
    }
}
