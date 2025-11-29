import React, { useState } from 'react';
import { format } from 'date-fns';
import { CelebrationDate } from '../utils/celebrationLogic';
import { generateGoogleCalendarUrl, generateOutlookUrl, downloadIcsFile, CalendarEvent } from '../utils/calendarUtils';

interface CelebrationCardProps {
    celebration: CelebrationDate;
}

const CelebrationCard: React.FC<CelebrationCardProps> = ({ celebration }) => {
    const { date, daysFromStart, reason, type } = celebration;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getGradient = (type: CelebrationDate['type']) => {
        switch (type) {
            case 'repdigit':
                return 'from-pink-500 to-rose-500';
            case 'palindrome':
                return 'from-purple-500 to-indigo-500';
            case 'sequential':
                return 'from-blue-400 to-cyan-300';
            case 'round':
                return 'from-emerald-400 to-teal-500';
            default:
                return 'from-gray-400 to-gray-500';
        }
    };

    const createCalendarEvent = (): CalendarEvent => {
        // Create an all-day event
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

        return {
            title: `🎉 ${daysFromStart.toLocaleString()} Days - ${type}`,
            description: reason,
            startDate,
            endDate,
        };
    };

    const handleGoogleCalendar = () => {
        const event = createCalendarEvent();
        const url = generateGoogleCalendarUrl(event);
        window.open(url, '_blank');
        setIsDropdownOpen(false);
    };

    const handleOutlookCalendar = () => {
        const event = createCalendarEvent();
        const url = generateOutlookUrl(event);
        window.open(url, '_blank');
        setIsDropdownOpen(false);
    };

    const handleAppleCalendar = () => {
        const event = createCalendarEvent();
        downloadIcsFile(event, `celebration-${daysFromStart}-days.ics`);
        setIsDropdownOpen(false);
    };

    return (
        <div className={`relative overflow-hidden rounded-xl p-6 text-white shadow-lg transition-transform hover:scale-105 bg-gradient-to-br ${getGradient(type)}`}>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-black/10 blur-xl" />

            <div className="relative z-10">
                <div className="mb-2 text-sm font-medium opacity-90 uppercase tracking-wider">
                    {type}
                </div>
                <div className="mb-1 text-4xl font-bold tracking-tight">
                    {daysFromStart.toLocaleString()} <span className="text-lg font-normal opacity-80">days</span>
                </div>
                <div className="mb-4 text-lg font-medium opacity-95">
                    {format(date, 'MMMM do, yyyy')}
                </div>
                <div className="text-sm opacity-90 italic mb-4">
                    "{reason}"
                </div>

                {/* Calendar Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Add to Calendar
                    </button>

                    {isDropdownOpen && (
                        <>
                            {/* Backdrop to close dropdown */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDropdownOpen(false)}
                            />

                            {/* Dropdown Menu */}
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl overflow-hidden z-20">
                                <button
                                    onClick={handleGoogleCalendar}
                                    className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-3"
                                >
                                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 14.47c0 .524-.428.952-.953.952H7.06a.954.954 0 01-.953-.952V9.53c0-.524.428-.952.953-.952h9.88c.526 0 .954.428.954.952v4.94z" />
                                    </svg>
                                    <span className="font-medium">Google Calendar</span>
                                </button>
                                <button
                                    onClick={handleOutlookCalendar}
                                    className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-3"
                                >
                                    <svg className="h-5 w-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 7.387v9.226a.387.387 0 01-.387.387H13.5V7h10.113c.214 0 .387.173.387.387zM11.25 17h-9a1.5 1.5 0 01-1.5-1.5v-7A1.5 1.5 0 012.25 7h9v10zm-4.5-7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                    </svg>
                                    <span className="font-medium">Outlook</span>
                                </button>
                                <button
                                    onClick={handleAppleCalendar}
                                    className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors flex items-center gap-3"
                                >
                                    <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <span className="font-medium">Apple Calendar / Other</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CelebrationCard;

