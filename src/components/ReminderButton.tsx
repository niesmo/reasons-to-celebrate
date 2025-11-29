'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
    requestNotificationPermission,
    getNotificationPermission,
    isNotificationSupported,
} from '../utils/notificationUtils';
import {
    saveReminder,
    deleteReminder,
    hasReminder,
    ReminderType,
    calculateNotificationDate,
} from '../utils/reminderStorage';

interface ReminderButtonProps {
    celebrationDate: string; // Original date (ISO string)
    celebrationTargetDate: string; // When the celebration occurs (ISO string)
    daysCount: number;
    celebrationName: string;
}

export default function ReminderButton({
    celebrationDate,
    celebrationTargetDate,
    daysCount,
    celebrationName,
}: ReminderButtonProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [permission, setPermission] = useState<string>('default');
    const [activeReminders, setActiveReminders] = useState<Set<ReminderType>>(new Set());
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (isNotificationSupported()) {
            setPermission(getNotificationPermission());
        }

        // Check which reminders are active
        const reminders = new Set<ReminderType>();
        if (hasReminder(celebrationTargetDate, daysCount, 'same-day')) reminders.add('same-day');
        if (hasReminder(celebrationTargetDate, daysCount, '1-day')) reminders.add('1-day');
        if (hasReminder(celebrationTargetDate, daysCount, '7-day')) reminders.add('7-day');
        setActiveReminders(reminders);
    }, [celebrationTargetDate, daysCount]);

    useEffect(() => {
        if (showMenu && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            // Position menu below the button, aligned to the right
            setMenuPosition({
                top: rect.bottom + scrollY + 8,
                left: rect.right + scrollX - 256, // 256px is width of menu (w-64)
            });
        }
    }, [showMenu]);

    const handleRequestPermission = async () => {
        const result = await requestNotificationPermission();
        setPermission(result);
        if (result === 'denied') {
            alert('Notifications are blocked. Please enable them in your browser settings.');
        }
    };

    const handleToggleReminder = async (type: ReminderType) => {
        if (!isNotificationSupported()) {
            alert('Notifications are not supported in this browser. If you are on mobile, try adding this app to your home screen first.');
            return;
        }

        if (permission !== 'granted') {
            await handleRequestPermission();
            return;
        }

        const isActive = activeReminders.has(type);

        if (isActive) {
            // Remove reminder
            const id = `${celebrationTargetDate}-${daysCount}-${type}`;
            deleteReminder(id);
            setActiveReminders(prev => {
                const next = new Set(prev);
                next.delete(type);
                return next;
            });
        } else {
            // Add reminder
            saveReminder({
                celebrationDate,
                celebrationTargetDate,
                daysCount,
                celebrationName,
                reminderType: type,
            });
            setActiveReminders(prev => new Set(prev).add(type));
        }
    };

    const getReminderLabel = (type: ReminderType): string => {
        const celebrationDate = new Date(celebrationTargetDate);
        const notificationDate = calculateNotificationDate(celebrationDate, type);

        switch (type) {
            case 'same-day':
                return `Same day (${notificationDate.toLocaleDateString()})`;
            case '1-day':
                return `1 day before (${notificationDate.toLocaleDateString()})`;
            case '7-day':
                return `7 days before (${notificationDate.toLocaleDateString()})`;
        }
    };



    const hasAnyReminder = activeReminders.size > 0;

    return (
        <>
            <div className="relative">
                <button
                    ref={buttonRef}
                    onClick={() => setShowMenu(!showMenu)}
                    className={`p-2 rounded-lg transition-all ${hasAnyReminder
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    title="Set reminder"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    {hasAnyReminder && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></span>
                    )}
                </button>
            </div>

            {showMenu && createPortal(
                <>
                    <div
                        className="fixed inset-0 z-[9999]"
                        onClick={() => setShowMenu(false)}
                    ></div>
                    <div
                        className="absolute w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-[10000] p-4"
                        style={{
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                    >
                        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-purple-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            Remind me
                        </h3>

                        {permission !== 'granted' && (
                            <div className="mb-3 p-2 bg-amber-900/30 border border-amber-700 rounded text-xs text-amber-200">
                                Enable notifications to set reminders
                            </div>
                        )}

                        <div className="space-y-2">
                            {(['same-day', '1-day', '7-day'] as ReminderType[]).map(type => {
                                const isActive = activeReminders.has(type);
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleToggleReminder(type)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${isActive
                                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{getReminderLabel(type)}</span>
                                            {isActive && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <p className="mt-3 text-xs text-slate-400">
                            Notifications will be sent at 9 AM on the reminder date
                        </p>
                    </div>
                </>,
                document.body
            )}
        </>
    );
}
