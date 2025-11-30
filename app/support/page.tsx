"use client";

import { useState } from "react";

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
      "For this project build, all race data and dashboards are open. In a real deployment you’d sign in to save favourites, upload your own sessions and sync settings across devices.",
  },
  {
    category: "Race Data",
    question: "Where does the race data come from?",
    answer:
      "The current demo uses pre-processed CSV files from a single Las Vegas 2024 race. In a full release, SimVixen would ingest telemetry / timing data streams or league exports from your sim platform.",
  },
  {
    category: "Playback & Timeline",
    question: "Why is the playback slightly different from TV broadcast?",
    answer:
      "The timeline is built from sample data at a fixed sampling rate. That means some micro-events (tiny lifts, wheel-to-wheel overlaps) can look slightly different compared to a frame-perfect TV feed.",
  },
  {
    category: "Technical",
    question: "Which browsers are supported?",
    answer:
      "The dashboard is optimised for Chromium-based browsers (Chrome, Edge, Arc, Brave) on desktop. It works on Safari and Firefox but complex canvas rendering may be a bit heavier.",
  },
  {
    category: "Projects & Uni Work",
    question: "Can I reference SimVixen in my coursework?",
    answer:
      "Yes. You can treat this as a concept tool for lap analysis and strategy. In a real environment, the backend would plug into your university’s data or any sim racing API you have access to.",
  },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");

  const filteredFaqs = FAQS.filter(f =>
    (f.question + f.answer)
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <main className="bg-black px-6 py-6 text-white h-[calc(100vh-64px)] overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col gap-6">
        {/* Hero */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
              Support Centre
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-wide mb-2">
              Need a hand in the paddock?
            </h1>
            <p className="text-sm text-neutral-300 max-w-xl">
              This page is your race engineer. Search for a topic, browse common
              questions, or outline how you’d extend SimVixen in a real
              deployment.
            </p>
          </div>

          {/* “Contact” style block – fake for now */}
          <div className="rounded-xl border border-neutral-900 bg-gradient-to-br from-neutral-950 via-neutral-950 to-black p-4 text-[11px] text-neutral-300 max-w-xs ml-auto">
            <p className="font-medium text-neutral-100 mb-1">
              Project contact
            </p>
            <p>
              In your report, drop your email / GitHub link here as the main
              contact for supervisors or reviewers.
            </p>
          </div>
        </section>

        {/* Search + content */}
        <section className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
          {/* Left: search & categories */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Search help
              </p>
              <div className="relative">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search telemetry, playback, members..."
                  className="w-full rounded-full bg-black border border-neutral-800 px-4 py-2.5 pr-10 text-[13px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-500">
                  ⌕
                </span>
              </div>
              <p className="mt-2 text-[11px] text-neutral-500">
                Search is local only for this demo. In production it would hit a
                knowledge base or docs API.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-4 text-[11px] text-neutral-300 space-y-2">
              <p className="font-medium text-neutral-100">Popular topics</p>
              <ul className="space-y-1">
                <li>• Understanding lap deltas & gaps</li>
                <li>• Why my playback doesn’t match TV timing</li>
                <li>• Importing your own CSV telemetry</li>
                <li>• Using the dashboard in a lab demo</li>
              </ul>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="md:w-2/3 flex-1 overflow-y-auto pr-1">
            <div className="space-y-4">
              {filteredFaqs.length === 0 && (
                <div className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-6 text-sm text-neutral-300">
                  <p className="mb-1">
                    No answers matched{" "}
                    <span className="text-red-400">
                      “{search.trim()}”
                    </span>
                    .
                  </p>
                  <p className="text-neutral-400">
                    For your project you can simply explain that this demo help
                    centre is static. In a real app you’d connect it to an FAQ /
                    docs system.
                  </p>
                </div>
              )}

              {filteredFaqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-neutral-900 bg-neutral-950/80 px-4 py-3 text-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                        {faq.category}
                      </p>
                      <p className="text-neutral-50">{faq.question}</p>
                    </div>
                    <span className="text-neutral-500 text-[11px] group-open:rotate-90 transition-transform">
                      ›
                    </span>
                  </summary>
                  <div className="mt-2 text-neutral-300 text-[13px] leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
