"use client";

import { useState, useMemo } from "react";

// --- Inline SVG Icons ---

// Search Icon
const SearchIcon = ({ className = "w-5 h-5" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
    </svg>
);

// Chevron Right Icon (for FAQ toggle)
const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

// Mail Icon (for Contact/Ticket button)
const MailIcon = ({ className = "w-5 h-5" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);


// --- Data Structure ---
type Faq = {
    category: string;
    question: string;
    answer: string;
};

const FAQS: Faq[] = [
    {
        category: "Account & Access",
        question: "Do I need an account to use the dashboard?",
        answer:
            "For this project build, all race data and dashboards are open. In a real deployment you’d sign in to save favourites, upload your own sessions and sync settings across devices. Authentication would use Firebase or a similar robust provider.",
    },
    {
        category: "Race Data",
        question: "Where does the race data come from?",
        answer:
            "The current demo uses pre-processed CSV files from a single Las Vegas 2024 race. In a full release, SimVixen would ingest telemetry / timing data streams or league exports from your sim platform (e.g., Assetto Corsa, iRacing, F1 24).",
    },
    {
        category: "Playback & Timeline",
        question: "Why is the playback slightly different from TV broadcast?",
        answer:
            "The timeline is built from sampled data at a fixed rate (e.g., 10Hz). That means some micro-events (tiny lifts, wheel-to-wheel overlaps) can look slightly different compared to a frame-perfect TV feed. This is typical when working with large data sets.",
    },
    {
        category: "Telemetry Analysis",
        question: "How do I compare laps between different drivers?",
        answer:
            "Use the 'Lap Comparison' tab in the Dashboard. Select the sessions you want to compare and use the delta-T chart for sector-by-sector performance analysis. Our Pro tier unlocks multi-channel overlaying for advanced engineer views.",
    },
    {
        category: "Technical",
        question: "Which browsers are supported?",
        answer:
            "The dashboard is optimised for modern, Chromium-based browsers (Chrome, Edge, Arc, Brave) on desktop. It works on Safari and Firefox but complex canvas rendering may be slightly less performant due to different engine optimizations.",
    },
    {
        category: "Projects & Uni Work",
        question: "Can I reference SimVixen in my coursework?",
        answer:
            "Yes. You can treat this as a concept tool for lap analysis and strategy. In a real environment, the backend would plug into your university’s data or any sim racing API you have access to. Feel free to detail your proposed extensions in your report.",
    },
];

// --- Components ---

const ContactTicketCard = () => (
    <div className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-5 shadow-lg flex flex-col gap-4 sticky top-0">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-red-500" />
            Can't find your answer?
        </h3>
        <p className="text-sm text-neutral-400">
            Submit a detailed ticket and our engineering support team will get back to you within 24 hours (for Pit Wall Pro and Enterprise members).
        </p>
        
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 rounded-full text-white font-bold text-sm hover:bg-red-500 transition-colors shadow-red-900/40 shadow-xl">
            Submit a New Ticket
        </button>

        <div className="pt-3 border-t border-neutral-800 mt-auto">
             <p className="text-[11px] text-neutral-500 italic">
                (Note: For demo purposes, this button is a placeholder. In a final project, this would integrate with a support ticketing system like Zendesk or GitHub Issues.)
            </p>
        </div>
    </div>
);

const PopularTopicsCard = () => (
    <div className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-4 text-sm text-neutral-300 space-y-2">
        <p className="font-medium text-neutral-100 uppercase text-[11px] tracking-widest mb-3">
            Popular Topics
        </p>
        <ul className="space-y-2 text-neutral-400 text-sm">
            <li className="flex items-center hover:text-red-500 transition-colors cursor-pointer">
                <ChevronRightIcon className="w-3 h-3 flex-shrink-0 mr-2 text-red-600/50" />
                Understanding lap deltas & gap analysis
            </li>
            <li className="flex items-center hover:text-red-500 transition-colors cursor-pointer">
                <ChevronRightIcon className="w-3 h-3 flex-shrink-0 mr-2 text-red-600/50" />
                Why my playback doesn’t match TV timing
            </li>
            <li className="flex items-center hover:text-red-500 transition-colors cursor-pointer">
                <ChevronRightIcon className="w-3 h-3 flex-shrink-0 mr-2 text-red-600/50" />
                Importing your own CSV telemetry files
            </li>
            <li className="flex items-center hover:text-red-500 transition-colors cursor-pointer">
                <ChevronRightIcon className="w-3 h-3 flex-shrink-0 mr-2 text-red-600/50" />
                Using the dashboard in a lab demo
            </li>
        </ul>
    </div>
);


// --- Main Page Component ---
export default function SupportPage() {
    const [search, setSearch] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFaqs = useMemo(() => {
        if (!search.trim()) {
            return FAQS;
        }
        const lowerSearch = search.trim().toLowerCase();
        return FAQS.filter(f =>
            (f.question + f.answer + f.category)
                .toLowerCase()
                .includes(lowerSearch)
        );
    }, [search]);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="bg-black text-white min-h-screen pt-12 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <section className="border-b border-neutral-800 pb-10 mb-10">
                    <div className="max-w-4xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-red-500 mb-2 font-medium">
                            Support Centre
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                            Need a hand in the paddock?
                        </h1>
                        <p className="text-lg text-neutral-400">
                            Find quick answers in our FAQ, browse popular topics, or connect with our dedicated engineering support team.
                        </p>
                    </div>
                </section>

                {/* Main Content: Sidebar and FAQ List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Search & Utility */}
                    <div className="lg:col-span-1 space-y-8">
                        
                        {/* Search Help Card */}
                        <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-5 shadow-lg">
                            <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-3">
                                Search Knowledge Base
                            </h3>
                            <div className="relative">
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search telemetry, playback, members..."
                                    className="w-full rounded-full bg-neutral-900 border border-neutral-700 px-4 py-3 pl-10 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 text-white placeholder-neutral-500 transition-colors"
                                />
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            </div>
                            <p className="mt-3 text-xs text-neutral-600">
                                Note: Search is local only for this demo. In production it would hit a knowledge base or docs API.
                            </p>
                        </div>

                        {/* Popular Topics Card */}
                        <PopularTopicsCard />

                        {/* Contact/Ticket Submission Card (Sticky on large screens) */}
                        <div className="hidden lg:block">
                            <ContactTicketCard />
                        </div>
                    </div>

                    {/* Right Column: FAQ List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-semibold text-white mb-4 border-b border-neutral-800 pb-2">
                            {search.trim() ? `Search Results (${filteredFaqs.length})` : 'Frequently Asked Questions'}
                        </h2>

                        {filteredFaqs.length === 0 && (
                            <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 text-sm text-neutral-400">
                                <p className="mb-2">
                                    No answers matched <span className="text-red-400 font-medium">“{search.trim()}”</span>.
                                </p>
                                <p className="text-neutral-500">
                                    Try a different keyword or submit a ticket using the form below.
                                </p>
                            </div>
                        )}

                        <div className="space-y-3">
                            {filteredFaqs.map((faq, idx) => (
                                <details
                                    key={idx}
                                    open={openIndex === idx}
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default toggle action
                                        handleToggle(idx);
                                    }}
                                    className={`
                                        group rounded-xl border transition-all duration-300
                                        ${openIndex === idx 
                                            ? 'border-red-600 bg-neutral-900/50 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                                            : 'border-neutral-900 bg-neutral-950/80 hover:border-neutral-700'
                                        }
                                        cursor-pointer
                                    `}
                                >
                                    <summary className="flex items-center justify-between gap-3 p-4 list-none outline-none">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs uppercase tracking-[0.2em] text-red-500/80 mb-1">
                                                {faq.category}
                                            </p>
                                            <p className="text-lg font-medium text-neutral-50 group-hover:text-red-300 transition-colors">
                                                {faq.question}
                                            </p>
                                        </div>
                                        <span className={`
                                            flex-shrink-0 text-neutral-500 transition-transform duration-300
                                            ${openIndex === idx ? 'rotate-90 text-red-500' : ''}
                                        `}>
                                            <ChevronRightIcon className="w-5 h-5" />
                                        </span>
                                    </summary>
                                    
                                    {openIndex === idx && (
                                        <div className="mt-0 pt-3 px-4 pb-4 border-t border-neutral-800/80">
                                            <p className="text-sm text-neutral-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </details>
                            ))}
                        </div>
                    </div>
                    
                    {/* Bottom: Contact/Ticket Submission Card (Visible on mobile/tablet) */}
                    <div className="lg:hidden mt-8">
                        <ContactTicketCard />
                    </div>

                </div>
            </div>
        </main>
    );
}