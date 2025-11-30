"use client";

import { useState, useEffect } from "react";
import { Oswald } from 'next/font/google'; 

// Initialize the Oswald font
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' }); 

// --- Type Definitions ---
type RaceStatus = "upcoming" | "completed";

type Race = {
  round: number;
  name: string;
  country: string;
  flag: string;
  circuit: string;
  date: string;    
  day: string;     
  time: string;    
  status: RaceStatus;
  circuitKey: string; 
  context: string; 
};

// --- Custom Simulated Race (Always Round 1) ---
// This is your current focus, forced to the top of the list.
const SIMULATION_FOCUS_RACE: Race = {
  round: 1,
  name: "Simulated Las Vegas Grand Prix",
  country: "United States",
  flag: "🇺🇸",
  circuit: "Las Vegas Street Circuit",
  date: "Today",
  day: "Now",
  time: "22:00",
  status: "upcoming", 
  circuitKey: "las-vegas", 
  context: "🔴 Your Current Simulation Focus. Race runs directly down the famous Las Vegas Strip.",
};


// Component for a single schedule row (Card Layout)
const RaceRow = ({ race }: { race: Race }) => (
  <article
    key={race.round}
    className="flex p-4 gap-4 items-start border-b border-neutral-900/50 hover:bg-neutral-900/70 transition-colors cursor-pointer"
  >
    
    {/* 1. IMAGE AREA (Left side) */}
    <div className="shrink-0 relative">
      <img 
        src={`/circuits/${race.circuitKey}.jpg`} 
        alt={`${race.circuit} Circuit Map`}
        className="w-48 h-28 object-cover rounded-lg shadow-lg border-2 border-neutral-700/50"
        // Fallback for missing images (shows a placeholder box)
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none'; 
          
          const placeholder = document.createElement('div');
          placeholder.className = 'w-48 h-28 bg-neutral-800 text-neutral-500 flex items-center justify-center text-xs rounded-lg border-2 border-neutral-700/50 italic shrink-0';
          placeholder.textContent = 'Circuit Map Placeholder';
          
          // Ensure we don't duplicate the placeholder
          if (!target.nextSibling || target.nextSibling.textContent !== 'Circuit Map Placeholder') {
              target.parentNode?.insertBefore(placeholder, target.nextSibling);
          }
        }}
      />
    </div>

    {/* 2. INFO AREA (Middle section - full height flex container) */}
    <div className="flex-grow flex flex-col justify-between h-28 pt-1 pb-1"> 
      
      {/* Top half: Main Race Details (Round, GP Name, Country/Flag) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2 text-xs text-neutral-400">
          {/* Round number */}
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-[10px] font-bold text-white">
            {race.round}
          </span>
          {/* Grand Prix Name */}
          <h2 className={`${oswald.className} font-semibold tracking-wide text-lg text-red-500 uppercase leading-none`}>
            {race.name}
          </h2>
        </div>

        {/* Date and Circuit */}
        <div className="flex flex-col text-sm text-neutral-300 ml-7">
          <span className="font-medium text-neutral-400">
            {race.date} {race.day !== 'Now' ? `, ${race.day}` : ''} @ {race.time} (Local)
          </span>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <span className="font-bold">{race.flag}</span>
            <span>{race.country}</span> 
            <span className="text-neutral-700 mx-1">|</span>
            <span className="italic">{race.circuit}</span>
          </span>
        </div>
      </div>

      {/* Bottom half: Context/Info */}
      <div className="text-xs text-neutral-500 italic mt-2 border-t border-neutral-900 pt-1">
          {race.context}
      </div>
    </div>

    {/* 3. STATUS AREA (Far right - aligned bottom-right) */}
    <div className="self-end shrink-0">
      <span
        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-bold shadow-md ${
          race.status === "upcoming"
            ? "bg-red-700 text-white"
            : "bg-neutral-800 text-neutral-300 border border-neutral-600/60"
        }`}
      >
        {race.status}
      </span>
    </div>
  </article>
);


// Main Page Component
export default function SchedulePage() {
  const [filter, setFilter] = useState<"all" | RaceStatus>("all");
  const [schedule, setSchedule] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the schedule data from the local JSON file
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Fetch data from the local JSON file
        const response = await fetch('/data/schedule.json');
        if (!response.ok) {
          throw new Error('Failed to fetch schedule data.');
        }
        const officialRaces: Race[] = await response.json();
        
        // Ensure official races are re-numbered to start after the simulated race
        // We use the index (0, 1, 2...) + 2 to make them Round 2, Round 3, etc.
        const renumberedRaces = officialRaces.map((race, index) => ({
          ...race,
          round: index + 2, 
        }));

        // Merge the simulated focus race at the beginning (Round 1)
        const fullSchedule = [SIMULATION_FOCUS_RACE, ...renumberedRaces];

        setSchedule(fullSchedule);
        setError(null);

      } catch (e) {
        setError("Could not load F1 schedule data. Please check if public/data/schedule.json exists and is valid.");
        console.error("Error fetching schedule:", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSchedule();
  }, []); 


  // Filter the races based on the user's selection
  const filteredRaces =
    filter === "all" ? schedule : schedule.filter(r => r.status === filter);

  return (
    <main className="bg-black py-10 w-full"> 
      <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-16"> 
        
        {/* Header row */}
        <header className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            {/* Displaying 2025 as the schedule year */}
            <h1 className={`${oswald.className} text-4xl md:text-5xl font-extrabold tracking-wide text-white uppercase`}>
              Simvixen Schedule (2025)
            </h1>
            {error && (
                <p className="text-red-500 text-sm italic">
                    {error}
                </p>
            )}
          </div>

          {/* Filter buttons */}
          <div className="inline-flex rounded-full bg-neutral-900/70 p-1 text-[11px] border border-neutral-700">
            {[
              { key: "all", label: "ALL" },
              { key: "upcoming", label: "UPCOMING" },
              { key: "completed", label: "COMPLETED" },
            ].map(item => (
              <button
                key={item.key}
                onClick={() =>
                  setFilter(item.key as "all" | RaceStatus)
                }
                className={`px-4 py-1.5 rounded-full transition-colors font-bold ${
                  filter === item.key
                    ? "bg-red-700 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* Legend / small info */}
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-600" /> Race Event
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-6 rounded-full bg-neutral-700" /> Practice / Quali Sessions
          </span>
        </div>

        {/* List: FIXED HEIGHT AND INNER SCROLLBAR */}
        <section className="h-[calc(100vh-250px)] overflow-y-auto pr-1"> 
          <div className="divide-y divide-neutral-900 border border-neutral-900 rounded-xl bg-neutral-950/70 backdrop-blur-sm shadow-2xl shadow-black/50">
            
            {loading ? (
                <div className="p-8 text-center text-neutral-400">
                    <svg className="animate-spin h-5 w-5 mr-3 inline text-red-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching Live Schedule Data...
                </div>
            ) : (
                <>
                {filteredRaces.map(race => (
                <RaceRow key={race.round} race={race} />
                ))}

                {filteredRaces.length === 0 && (
                <div className="px-5 py-8 text-sm text-neutral-500">
                    No races match this filter.
                </div>
                )}
                </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}