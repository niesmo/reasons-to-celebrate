'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSavedDates, SavedDate } from '../utils/savedDatesStorage';
import { format, parseISO } from 'date-fns';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [savedDates, setSavedDates] = useState<SavedDate[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    // Load saved dates when menu opens
    useEffect(() => {
        if (isOpen) {
            setSavedDates(getSavedDates());
        }
    }, [isOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleSavedDateClick = (date: string, name: string) => {
        router.push(`/?date=${date}&name=${encodeURIComponent(name)}`);
        setIsOpen(false);
    };

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-6 z-50 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white backdrop-blur-sm transition-colors"
                aria-label="Open Menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-over Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white">Menu</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            aria-label="Close Menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-6">
                        {/* Main Links */}
                        <div className="space-y-2">
                            <Link
                                href="/"
                                className={`block px-4 py-3 rounded-lg transition-colors ${pathname === '/' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className={`block px-4 py-3 rounded-lg transition-colors ${pathname === '/about' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                About
                            </Link>
                        </div>

                        <div className="border-t border-slate-800 pt-6">
                            <div className="flex justify-between items-center mb-4 px-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                    Saved Dates
                                </h3>
                                <button
                                    onClick={() => {
                                        router.push('/');
                                        setIsOpen(false);
                                    }}
                                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                >
                                    View All Upcoming
                                </button>
                            </div>
                            {savedDates.length > 0 ? (
                                <div className="space-y-1">
                                    {savedDates.map((saved) => (
                                        <button
                                            key={saved.id}
                                            onClick={() => handleSavedDateClick(saved.date, saved.name)}
                                            className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800 group transition-colors flex justify-between items-center"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-300 group-hover:text-white truncate text-sm">
                                                    {saved.name}
                                                </div>
                                                <div className="text-xs text-slate-500 group-hover:text-slate-400">
                                                    {format(parseISO(saved.date), 'MMM d, yyyy')}
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="px-4 text-sm text-slate-600 italic">
                                    No saved dates yet.
                                </p>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navigation;
