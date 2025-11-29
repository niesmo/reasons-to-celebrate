'use client';

import Link from 'next/link';

export default function About() {
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
                        About This Site
                    </h1>
                </header>

                {/* Story Section */}
                <div className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-6">
                                A Family Tradition
                            </h2>

                            <div className="space-y-6 text-slate-300 leading-relaxed">
                                <p className="text-xl">
                                    This site was born from a simple yet beautiful tradition that my dad started years ago.
                                </p>

                                <p>
                                    Every year, my dad would sit down with a calendar and carefully calculate special milestone dates for our family. He'd count the days from birthdays, anniversaries, and other meaningful moments to find those aesthetically pleasing numbers — you know, the ones that just <em>feel</em> special.
                                </p>

                                <p>
                                    Numbers like <span className="font-mono text-amber-400 font-semibold">111</span>, <span className="font-mono text-amber-400 font-semibold">1,234</span>, <span className="font-mono text-amber-400 font-semibold">12,121</span>, or even <span className="font-mono text-amber-400 font-semibold">100,000</span> days since a cherished date. These weren't just random numbers — they were reasons to pause, reflect, and celebrate together.
                                </p>

                                <div className="bg-slate-900 rounded-lg p-6 my-8 border-l-4 border-orange-500">
                                    <p className="text-slate-200 italic">
                                        "Whenever one of these 'special' days would arrive, we'd have a celebration — maybe order a pizza, bake a cake, or just gather together to mark the moment. It wasn't about grand gestures; it was about finding joy in the everyday passage of time."
                                    </p>
                                </div>

                                <p>
                                    What made it truly special was the anticipation. We'd have these dates marked on our calendar, and as they approached, there was this shared excitement in our family. It turned ordinary days into extraordinary ones, simply by recognizing the beautiful patterns hidden in time.
                                </p>

                                <p>
                                    This website is my way of keeping that tradition alive and sharing it with others. Now, instead of manually calculating these special dates, you can discover all your upcoming reasons to celebrate with just a few clicks.
                                </p>

                                <p className="text-lg font-semibold text-slate-100 mt-8">
                                    Because every day counts, and some days count in especially beautiful ways. 🎉
                                </p>
                            </div>
                        </div>
                    </div>
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
