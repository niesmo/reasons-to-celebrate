'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, startOfDay } from 'date-fns';
import confetti from 'canvas-confetti';
import { getCelebrationDates, CelebrationDate } from '../utils/celebrationLogic';
import CelebrationCard from '../components/CelebrationCard';

export default function Home() {
  const [dateStr, setDateStr] = useState<string>('');
  const [celebrations, setCelebrations] = useState<CelebrationDate[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    setDateStr(newDateStr);

    if (newDateStr) {
      const date = startOfDay(parseISO(newDateStr));
      const newCelebrations = getCelebrationDates(date);
      setCelebrations(newCelebrations);

      // Trigger confetti if we have results
      if (newCelebrations.length > 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF69B4', '#FFD700', '#00BFFF', '#32CD32']
        });
      }
    } else {
      setCelebrations([]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-6 animate-pulse">
            Reasons to Celebrate
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Every day counts. Enter a significant date to discover the hidden aesthetic milestones in your timeline.
          </p>
        </header>

        <div className="flex justify-center mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="date"
              value={dateStr}
              onChange={handleDateChange}
              className="relative block w-full min-w-[300px] rounded-lg border-0 bg-slate-800 py-4 px-6 text-white shadow-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-lg sm:leading-6"
            />
          </div>
        </div>

        {celebrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {celebrations.map((celebration, index) => (
              <CelebrationCard key={index} celebration={celebration} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 mt-12">
            <p>Select a date to begin the celebration...</p>
          </div>
        )}
      </div>
    </main>
  );
}
