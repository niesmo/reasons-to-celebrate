import { format } from 'date-fns';

export interface CalendarEvent {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

/**
 * Formats a date for Google Calendar URL (YYYYMMDDTHHMMSSZ format in UTC)
 */
const formatDateForGoogle = (date: Date): string => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
};

/**
 * Formats a date for Outlook URL (ISO 8601 format)
 */
const formatDateForOutlook = (date: Date): string => {
    return date.toISOString();
};

/**
 * Generates a Google Calendar URL
 */
export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
    const { title, description, startDate, endDate } = event;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        details: description,
        dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Generates an Outlook Calendar URL
 */
export const generateOutlookUrl = (event: CalendarEvent): string => {
    const { title, description, startDate, endDate } = event;

    const params = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        subject: title,
        body: description,
        startdt: formatDateForOutlook(startDate),
        enddt: formatDateForOutlook(endDate),
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

/**
 * Generates ICS file content
 */
export const generateIcsContent = (event: CalendarEvent): string => {
    const { title, description, startDate, endDate } = event;

    // Format dates for ICS (YYYYMMDDTHHMMSSZ)
    const formatIcsDate = (date: Date): string => {
        return format(date, "yyyyMMdd'T'HHmmss'Z'");
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Reasons to Celebrate//EN',
        'BEGIN:VEVENT',
        `DTSTART:${formatIcsDate(startDate)}`,
        `DTEND:${formatIcsDate(endDate)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n');

    return icsContent;
};

/**
 * Downloads an ICS file
 */
export const downloadIcsFile = (event: CalendarEvent, filename: string = 'celebration.ics'): void => {
    const icsContent = generateIcsContent(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};
