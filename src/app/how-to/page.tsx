'use client';

import Link from 'next/link';

export default function HowTo() {
    return (
        <main className="min-h-screen bg-slate-900 text-slate-100 p-8 md:p-24">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-8 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Home
                </Link>

                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-6">
                        How to Use
                    </h1>
                    <p className="text-xl text-slate-400">
                        Everything you need to know about Reasons to Celebrate
                    </p>
                </header>

                {/* Main Content */}
                <div className="space-y-12">
                    {/* Getting Started */}
                    <section className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-6">
                            Getting Started
                        </h2>
                        <div className="space-y-6 text-slate-300 leading-relaxed">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">1. Enter a Special Date</h3>
                                <p>
                                    On the home page, click the date input field and select a meaningful date — like a birthday, anniversary, or any special moment you want to celebrate.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">2. Discover Milestones</h3>
                                <p>
                                    Once you enter a date, the app will automatically calculate and display beautiful milestone dates based on aesthetically pleasing numbers like <span className="font-mono text-amber-400">111</span>, <span className="font-mono text-amber-400">1,234</span>, <span className="font-mono text-amber-400">12,121</span>, and more!
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">3. Filter by Pattern Type</h3>
                                <p>
                                    Use the filter buttons to show only the types of patterns you're interested in:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                    <li><strong>Repdigits:</strong> Numbers with repeating digits (111, 222, 3333)</li>
                                    <li><strong>Palindromes:</strong> Numbers that read the same forwards and backwards (121, 12321)</li>
                                    <li><strong>Sequential:</strong> Numbers in sequence (123, 1234, 12345)</li>
                                    <li><strong>Round Numbers:</strong> Nice round milestones (1000, 5000, 10000)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">4. Save Your Dates</h3>
                                <p>
                                    Click the "💾 Save This Date" button to give your date a name and save it for quick access later. Your saved dates appear as pills at the top of the page and in the menu.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">5. Add to Calendar</h3>
                                <p>
                                    Each celebration card has an "Add to Calendar" button. Click it to add the milestone to Google Calendar, Outlook, or download an .ics file for Apple Calendar and other apps.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">6. Set Reminders</h3>
                                <p>
                                    Click the bell icon on any celebration card to set up browser notifications. You'll be reminded 1 day before the celebration so you don't miss it!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Install as App */}
                    <section className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6">
                            Install on Your Phone
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Add Reasons to Celebrate to your home screen for quick access, just like a native app!
                        </p>

                        {/* iOS Instructions */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                iPhone / iPad (Safari)
                            </h3>
                            <ol className="space-y-3 text-slate-300 ml-6">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">1</span>
                                    <span>Open this website in Safari or Chrome</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">2</span>
                                    <span>Tap the <strong>Share button</strong> at the bottom of the screen (square with an arrow pointing up)</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">3</span>
                                    <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">4</span>
                                    <span>Tap <strong>"Add"</strong> in the top right corner</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">5</span>
                                    <span>The app icon will now appear on your home screen!</span>
                                </li>
                            </ol>
                        </div>

                        {/* Android Instructions */}
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 11.03 1 14.22 1 17.8h22c0-3.58-1.92-6.77-5.4-8.32zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
                                </svg>
                                Android (Chrome)
                            </h3>
                            <ol className="space-y-3 text-slate-300 ml-6">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">1</span>
                                    <span>Open this website in <strong>Chrome</strong></span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">2</span>
                                    <span>Tap the <strong>three-dot menu</strong> in the top right corner</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">3</span>
                                    <span>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">4</span>
                                    <span>Tap <strong>"Add"</strong> or <strong>"Install"</strong> to confirm</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold">5</span>
                                    <span>The app icon will now appear on your home screen!</span>
                                </li>
                            </ol>
                        </div>

                        <div className="mt-8 p-4 bg-slate-900 rounded-lg border-l-4 border-cyan-500">
                            <p className="text-slate-200">
                                <strong>💡 Tip:</strong> Once installed, the app works offline and sends you notifications for upcoming celebrations!
                            </p>
                        </div>
                    </section>

                    {/* Tips & Tricks */}
                    <section className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
                            Tips & Tricks
                        </h2>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex gap-3">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <strong className="text-white">View All Upcoming:</strong> Click "View All Upcoming" in the menu to see all upcoming celebrations from all your saved dates in one place.
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-2xl">📱</span>
                                <div>
                                    <strong className="text-white">Quick Access:</strong> Save multiple important dates (birthdays, anniversaries, etc.) and switch between them using the pills at the top of the page.
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-2xl">🔔</span>
                                <div>
                                    <strong className="text-white">Never Miss a Celebration:</strong> Enable notifications for your favorite milestones so you can plan ahead!
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-2xl">🎨</span>
                                <div>
                                    <strong className="text-white">Pattern Types:</strong> Each pattern type has its own color scheme on the cards — pink for repdigits, purple for palindromes, blue for sequential, and green for round numbers.
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Start Celebrating
                    </Link>
                </div>
            </div>
        </main>
    );
}
