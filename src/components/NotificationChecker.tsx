'use client';

import { useEffect } from 'react';
import {
    getDueReminders,
    markAsNotified,
    cleanupOldReminders,
} from '../utils/reminderStorage';
import { showCelebrationNotification } from '../utils/notificationUtils';

export default function NotificationChecker() {
    useEffect(() => {
        // Check for due reminders on mount
        const checkReminders = async () => {
            try {
                // Clean up old reminders first
                cleanupOldReminders();

                // Get reminders that are due
                const dueReminders = getDueReminders();

                // Send notifications for each due reminder
                for (const reminder of dueReminders) {
                    await showCelebrationNotification(
                        reminder.celebrationName,
                        reminder.celebrationDate,
                        reminder.daysCount
                    );

                    // Mark as notified
                    markAsNotified(reminder.id);
                }

                if (dueReminders.length > 0) {
                    console.log(`Sent ${dueReminders.length} celebration reminder(s)`);
                }
            } catch (error) {
                console.error('Error checking reminders:', error);
            }
        };

        // Check immediately
        checkReminders();

        // Set up interval to check every hour
        const interval = setInterval(checkReminders, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // This component doesn't render anything
    return null;
}
