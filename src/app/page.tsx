'use client';

import { useState, useEffect, Suspense } from 'react';
import { format, parseISO, startOfDay } from 'date-fns';
import confetti from 'canvas-confetti';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCelebrationDates, CelebrationDate } from '../utils/celebrationLogic';
import CelebrationCard from '../components/CelebrationCard';
import InstallPrompt from '../components/InstallPrompt';
import NotificationChecker from '../components/NotificationChecker';
import UpcomingEvents from '../components/UpcomingEvents';
import FilterControl from '../components/FilterControl';
import { getSavedDates, saveDateWithName, deleteSavedDate, SavedDate } from '../utils/savedDatesStorage';

function HomeContent() {
  const [dateStr, setDateStr] = useState<string>('');
  const [celebrations, setCelebrations] = useState<CelebrationDate[]>([]);
  const [savedDates, setSavedDates] = useState<SavedDate[]>([]);
  const [activeName, setActiveName] = useState<string>('');
  const [saveName, setSaveName] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  const [showSaveInput, setShowSaveInput] = useState<boolean>(false);
  const [filterTypes, setFilterTypes] = useState<CelebrationDate['type'][]>([
    'repdigit', 'palindrome', 'sequential', 'round'
  ]);

  // Load saved dates on mount and check for URL params
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load saved dates on mount
  useEffect(() => {
    setSavedDates(getSavedDates());
  }, []);

  // Check for URL params to load a saved date
  useEffect(() => {
    const dateParam = searchParams.get('date');
    const nameParam = searchParams.get('name');

    if (dateParam) {
      setDateStr(dateParam);
      if (nameParam) setActiveName(nameParam);

      const parsedDate = startOfDay(parseISO(dateParam));
      const newCelebrations = getCelebrationDates(parsedDate, 50, filterTypes);
      setCelebrations(newCelebrations);
    } else {
      // Clear active name if no date param
      setActiveName('');
      // If we are clearing the date (e.g. "View All Upcoming"), clear the input and results
      if (!dateParam && dateStr) {
        setDateStr('');
        setCelebrations([]);
      }
    }
  }, [searchParams]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    setDateStr(newDateStr);
    setActiveName(''); // Clear active name when manually changing date

    if (newDateStr) {
      const date = startOfDay(parseISO(newDateStr));
      const newCelebrations = getCelebrationDates(date, 50, filterTypes);
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

  // Update celebrations when filters change
  useEffect(() => {
    if (dateStr) {
      const date = startOfDay(parseISO(dateStr));
      const newCelebrations = getCelebrationDates(date, 50, filterTypes);
      setCelebrations(newCelebrations);
    }
  }, [filterTypes, dateStr]);

  const handleSaveDate = () => {
    if (!dateStr) {
      setSaveError('Please select a date first');
      return;
    }

    if (!saveName.trim()) {
      setSaveError('Please enter a name for this date');
      return;
    }

    try {
      saveDateWithName(saveName, dateStr);
      setSavedDates(getSavedDates());
      setSaveName('');
      setSaveError('');
      setShowSaveInput(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save date');
    }
  };

  const handleDeleteDate = (id: string) => {
    if (deleteSavedDate(id)) {
      setSavedDates(getSavedDates());
    }
  };

  const handleLoadSavedDate = (date: string, name: string) => {
    router.push(`/?date=${date}&name=${encodeURIComponent(name)}`);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-8 h-8">
          {/* Spacer to keep layout consistent if needed, or just remove the div entirely if preferred. 
              Keeping a small spacer for now to avoid layout shift if the header relies on top padding. 
              Actually, let's just remove the link but keep the container for spacing if the design expects it,
              or better yet, remove the container if it's empty. 
              Looking at the code, it's just a flex container. I'll remove the link content. */}
        </div>

        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-6 animate-pulse">
            {activeName ? `Celebrating ${activeName}` : 'Reasons to Celebrate'}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {activeName
              ? `Discovering aesthetic milestones for ${format(parseISO(dateStr), 'MMMM do, yyyy')}`
              : 'Every day counts. Enter a significant date to discover the hidden aesthetic milestones in your timeline.'}
          </p>
        </header>

        {/* Saved Dates Section (Compact) */}
        {savedDates.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
            {savedDates.map((saved) => (
              <div
                key={saved.id}
                className={`flex-shrink-0 rounded-full px-4 py-2 cursor-pointer transition-all border ${saved.name === activeName
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
                  }`}
                onClick={() => handleLoadSavedDate(saved.date, saved.name)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{saved.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDate(saved.id);
                    }}
                    className="text-slate-400 hover:text-red-400 transition-colors p-0.5 rounded-full hover:bg-white/10"
                    aria-label="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Date Input Section */}
        <div className="flex justify-center mb-8 px-6">
          <div className="relative group w-full max-w-md overflow-hidden rounded-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="date"
              value={dateStr}
              onChange={handleDateChange}
              className="relative block w-full rounded-lg border-0 bg-slate-800 py-4 px-6 text-white shadow-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-base sm:text-lg sm:leading-6"
            />
          </div>
        </div>

        {/* Filter Control */}
        {(dateStr || savedDates.length > 0) && (
          <FilterControl
            selectedTypes={filterTypes}
            onChange={setFilterTypes}
          />
        )}

        {/* Save Date Button */}
        {dateStr && (
          <div className="flex justify-center mb-16">
            {!showSaveInput ? (
              <button
                onClick={() => setShowSaveInput(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg"
              >
                💾 Save This Date
              </button>
            ) : (
              <div className="bg-slate-800 rounded-lg p-4 w-full max-w-md">
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="Enter a name for this date..."
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  maxLength={100}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveDate()}
                />
                {saveError && (
                  <p className="text-red-400 text-sm mb-3">{saveError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveDate}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowSaveInput(false);
                      setSaveName('');
                      setSaveError('');
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Celebrations Grid */}
        {celebrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {celebrations.map((celebration, index) => (
              <CelebrationCard key={index} celebration={celebration} />
            ))}
          </div>
        ) : savedDates.length > 0 ? (
          <UpcomingEvents savedDates={savedDates} filterTypes={filterTypes} />
        ) : (
          <div className="text-center text-slate-500 mt-12">
            <p>Select a date to begin the celebration...</p>
          </div>
        )}
      </div>
      <InstallPrompt />
      <NotificationChecker />
    </main >
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-6 animate-pulse">
              Reasons to Celebrate
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Loading...
            </p>
          </header>
        </div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}

