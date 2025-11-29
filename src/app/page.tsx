'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, startOfDay } from 'date-fns';
import confetti from 'canvas-confetti';
import { getCelebrationDates, CelebrationDate } from '../utils/celebrationLogic';
import CelebrationCard from '../components/CelebrationCard';
import InstallPrompt from '../components/InstallPrompt';
import { getSavedDates, saveDateWithName, deleteSavedDate, SavedDate } from '../utils/savedDatesStorage';

export default function Home() {
  const [dateStr, setDateStr] = useState<string>('');
  const [celebrations, setCelebrations] = useState<CelebrationDate[]>([]);
  const [savedDates, setSavedDates] = useState<SavedDate[]>([]);
  const [saveName, setSaveName] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  const [showSaveInput, setShowSaveInput] = useState<boolean>(false);

  // Load saved dates on mount
  useEffect(() => {
    setSavedDates(getSavedDates());
  }, []);

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

  const handleLoadSavedDate = (date: string) => {
    setDateStr(date);
    const parsedDate = startOfDay(parseISO(date));
    const newCelebrations = getCelebrationDates(parsedDate);
    setCelebrations(newCelebrations);
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

        {/* Saved Dates Section */}
        {savedDates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-slate-200">Saved Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedDates.map((saved) => (
                <div
                  key={saved.id}
                  className="bg-slate-800 rounded-lg p-4 hover:bg-slate-750 transition-colors cursor-pointer group relative"
                  onClick={() => handleLoadSavedDate(saved.date)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{saved.name}</h3>
                      <p className="text-sm text-slate-400">{format(parseISO(saved.date), 'MMMM d, yyyy')}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDate(saved.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 p-1"
                      aria-label="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date Input Section */}
        <div className="flex justify-center mb-8 px-4">
          <div className="relative group w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="date"
              value={dateStr}
              onChange={handleDateChange}
              className="relative block w-full rounded-lg border-0 bg-slate-800 py-4 px-6 text-white shadow-xl placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-base sm:text-lg sm:leading-6"
            />
          </div>
        </div>

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
        ) : (
          <div className="text-center text-slate-500 mt-12">
            <p>Select a date to begin the celebration...</p>
          </div>
        )}
      </div>
      <InstallPrompt />
    </main>
  );
}

