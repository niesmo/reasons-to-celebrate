import React, { useEffect, useState } from 'react';
import { parseISO, startOfDay, isAfter, isSameDay } from 'date-fns';
import { SavedDate } from '../utils/savedDatesStorage';
import { getCelebrationDates, CelebrationDate } from '../utils/celebrationLogic';
import CelebrationCard from './CelebrationCard';

interface UpcomingEventsProps {
    savedDates: SavedDate[];
    filterTypes: CelebrationDate['type'][];
}

interface UpcomingCelebration extends CelebrationDate {
    sourceName: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ savedDates, filterTypes }) => {
    const [events, setEvents] = useState<UpcomingCelebration[]>([]);

    useEffect(() => {
        const calculateUpcomingEvents = () => {
            const allEvents: UpcomingCelebration[] = [];
            const today = startOfDay(new Date());

            savedDates.forEach((saved) => {
                const date = startOfDay(parseISO(saved.date));
                // Get enough candidates to find upcoming ones
                const celebrations = getCelebrationDates(date, 50, filterTypes);

                celebrations.forEach((celebration) => {
                    // Only include future dates or today
                    if (isAfter(celebration.date, today) || isSameDay(celebration.date, today)) {
                        allEvents.push({
                            ...celebration,
                            sourceName: saved.name,
                        });
                    }
                });
            });

            // Sort by date (nearest first)
            allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

            // Take top 12
            setEvents(allEvents.slice(0, 12));
        };

        calculateUpcomingEvents();
    }, [savedDates, filterTypes]);

    if (events.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Upcoming Celebrations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <CelebrationCard
                        key={`${event.sourceName}-${event.daysFromStart}-${index}`}
                        celebration={event}
                        sourceName={event.sourceName}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;
