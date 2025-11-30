"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
// We no longer need the API configuration since we are using static data.

// --- Inline SVG Icons (Replacement for lucide-react) ---

// Replacement for X icon (Close/Error)
const XIcon = ({ size = 20, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
);

// Replacement for ChevronRight icon (Read More)
const ChevronRightIcon = ({ size = 18, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 18l6-6-6-6"/>
    </svg>
);

// --- Type Definitions ---
type Category = "all" | "race" | "analysis" | "tech" | "driver"; // Changed general to driver for F1 focus

type Article = {
  id: string; 
  title: string;
  summary: string; // Used for the sidebar/lead article preview
  kicker: string; 
  category: Category;
  timeAgo: string; // Placeholder for display
  tag: string; // Used for the footer/small label
  imageUrl: string; // New: Local image path for the thumbnail
};

type FullArticle = {
    title: string;
    body: string; // Full markdown content
    citationUri?: string; // Source link
}


// --- STATIC DATA FOR NEWS DASHBOARD ---
const STATIC_ARTICLES: Article[] = [
    {
        id: "1",
        title: "Max Verstappen Clinches Title in Dramatic Finale at Yas Marina",
        summary: "Verstappen secured his eighth consecutive championship after a chaotic final lap decision, leaving rivals stunned by the sheer dominance of his RB20.",
        kicker: "RACE REPORT",
        category: "race",
        timeAgo: "1h ago",
        tag: "Yas Marina",
        imageUrl: "/f1_article_thumb_4.jpg" // Lead article image
    },
    {
        id: "2",
        title: "Ferrari's Strategy Blunder Cost Leclerc P2, Team Admits Errors",
        summary: "Leclerc finished 5th after a mid-race safety car saw the team pit him onto old hard tyres, an action they later conceded was a mistake.",
        kicker: "ANALYSIS",
        category: "analysis",
        timeAgo: "3h ago",
        tag: "Strategy",
        imageUrl: "/f1_article_thumb_2.jpg"
    },
    {
        id: "3",
        title: "Inside the New FIA Regulations: How Ground Effects Will Change in 2026",
        summary: "A deep dive into the complex aerodynamic changes planned for the next generation of F1 cars, focusing on sustainability and closer racing.",
        kicker: "TECH INSIGHT",
        category: "tech",
        timeAgo: "6h ago",
        tag: "Aerodynamics",
        imageUrl: "/f1_article_thumb_1.jpg"
    },
    {
        id: "4",
        title: "Zhou Guanyu Confirmed to Stay at Kick Sauber for 2025 Season",
        summary: "The Chinese driver secures his seat for another year, bringing vital funding and stability to the Sauber team ahead of the Audi takeover.",
        kicker: "DRIVER NEWS",
        category: "driver",
        timeAgo: "Yesterday",
        tag: "Transfers",
        imageUrl: "/f1_article_thumb_3.jpg"
    },
    {
        id: "5",
        title: "Mercedes Struggles Continue: Wolff Vows Aggressive Car Concept Change",
        summary: "Toto Wolff confirmed that the team will abandon the 'zero-sidepod' philosophy in a desperate bid to close the gap to Red Bull.",
        kicker: "TEAM REPORT",
        category: "analysis",
        timeAgo: "Yesterday",
        tag: "Design",
        imageUrl: "/f1_article_thumb_2.jpg"
    },
    {
        id: "6",
        title: "New Tyre Compounds Debuted: Pirelli Focuses on Reducing Blistering",
        summary: "Pirelli introduced two new experimental compounds during the post-season test to gather data on managing overheating and degradation.",
        kicker: "TECH REPORT",
        category: "tech",
        timeAgo: "2d ago",
        tag: "Pirelli",
        imageUrl: "/f1_article_thumb_1.jpg"
    },
    {
        id: "7",
        title: "Aston Martin's Strong Finish: Alonso Hails Car's Mid-Season Improvements",
        summary: "Fernando Alonso finished P4, praising the significant upgrades that allowed the team to challenge the front-runners in the second half of the year.",
        kicker: "RACE HIGHLIGHTS",
        category: "race",
        timeAgo: "2d ago",
        tag: "Performance",
        imageUrl: "/f1_article_thumb_5.jpg"
    },
    {
        id: "8",
        title: "Logan Sargeant Looking for a Stronger Comeback Season at Williams",
        summary: "The American driver acknowledged his rookie struggles but expressed confidence in his ability to deliver consistent points in his sophomore year.",
        kicker: "DRIVER PROFILE",
        category: "driver",
        timeAgo: "3d ago",
        tag: "Interview",
        imageUrl: "/f1_article_thumb_3.jpg"
    },
    {
        id: "9",
        title: "Data Scientists Say: Why High-Grip Tracks Favor Front-Wing Load",
        summary: "An in-depth data analysis showing the correlation between circuit layout and the optimal front-wing stiffness settings used by top teams.",
        kicker: "SIM VIXEN",
        category: "analysis",
        timeAgo: "3d ago",
        tag: "Data Viz",
        imageUrl: "/f1_article_thumb_2.jpg"
    },
    {
        id: "10",
        title: "McLaren's Record Pit Stop: How the Crew Shaved Off 0.05 Seconds",
        summary: "Details on the precise, synchronized movements and specialized equipment that allowed the McLaren pit crew to set a new world record.",
        kicker: "RACE ENGINEERING",
        category: "tech",
        timeAgo: "1w ago",
        tag: "Pit Wall",
        imageUrl: "/f1_article_thumb_1.jpg"
    }
];

// --- Component: News Article Modal (Full Story View) ---
// This component now contains static, pre-generated content for simplicity.
const NewsModal = ({ 
    article, 
    onClose 
}: { 
    article: Article | null, 
    onClose: () => void 
}) => {
    
    // Static Body Content (We'll generate a detailed body based on the article title)
    const getStaticFullContent = (articleTitle: string): FullArticle => {
        
        // This is a complex template, simulating a detailed 5-paragraph article 
        // that would have been generated by the LLM.
        const bodyContent = `
        **Introduction: The Unstoppable Force**
        The final race of the season delivered the high drama expected, culminating in a spectacular victory for Max Verstappen. The Red Bull driver entered the weekend needing only a handful of points but finished with a flourish, securing his latest title in dominant fashion. Despite a mid-race safety car that bunched the field, Verstappen maintained his composure and managed the gap perfectly, showcasing the formidable power of the RB20 chassis. This win was not just a race victory; it was a statement of unparalleled technical and psychological supremacy in modern Formula 1.

        **The Mid-Race Chaos**
        The turning point arrived on lap 40 when an incident involving two midfield cars necessitated a full Safety Car deployment. This triggered a frenzy in the pit lane. While most front-runners chose to pit for new soft tires, the strategists at Red Bull kept a cool head, allowing Verstappen to take the track lead while the others scrambled. This proved to be the decisive move, as the clear air allowed him to manage his tire temperatures perfectly upon the restart, preventing any opportunistic overtakes.

        **Verstappen's Masterclass**
        Verstappen's drive was a masterclass in tire management and spatial awareness. Despite immense pressure from the car behind, he rarely locked up and always hit his apexes with surgical precision. The 10-lap sprint to the finish saw him pull a margin of over three seconds, demonstrating the car’s capability and his own unmatched skill level. This performance solidifies his place among the sport's all-time greats, not just for raw speed but for his ability to perform flawlessly under maximum stress.

        **Rival Team Analysis**
        While Red Bull celebrated, rival teams like Mercedes and Ferrari were left to dissect where their challenge faltered. Ferrari, in particular, suffered from an overly cautious tire strategy, compromising their ability to fight for the final podium spot. Mercedes showed flashes of pace but ultimately couldn't match the Red Bull's top-end speed, highlighting the continued development gap they must overcome during the off-season. The competitive landscape remains heavily skewed towards Milton Keynes.

        **Looking Ahead to Next Season**
        With the 2025 season now officially wrapped, all focus immediately shifts to the technical regulations coming into play for 2026. This monumental shift in rules offers a chance for the trailing teams to reset and challenge Red Bull's dominance. However, history shows that the team that gets the first set of rules right often sets the tone for the era. The pressure is now on every team to maximize their winter development program.

        **Key Takeaways**
        * Verstappen's title win was confirmed by managing tire wear after a mid-race Safety Car period.
        * The RB20 chassis demonstrated exceptional balance and tire preservation qualities, even on a high-energy track.
        * Rivals face a critical winter, as the gap to Red Bull remains significant despite late-season improvements.
        `;
        
        return {
            title: articleTitle,
            body: bodyContent,
            citationUri: "https://www.formula1.com/en/latest/headlines.html" // Static source for static content
        };
    };

    const fullContent = article ? getStaticFullContent(article.title) : null;
    
    if (!article) return null;

    // A simple Markdown parser for display
    const renderContent = (markdown: string) => {
        const lines = markdown.split('\n');
        return lines.map((line, index) => {
            let element: React.ReactNode = line;
            
            // Look for Key Takeaways heading
            if (line.toLowerCase().includes('key takeaways')) {
                // If you want to list the points, grab the next lines
                const listItems = lines.slice(index + 1).filter(l => l.trim().startsWith('*')).map((l, i) => (
                     <li key={`li-${i}`} className="ml-5 list-disc text-neutral-300 text-sm" dangerouslySetInnerHTML={{
                        __html: l.replace(/^\*+\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                ));

                return (
                    <div key={index}>
                         <h3 className={`text-xl font-bold mt-8 mb-4 text-red-500 uppercase border-b border-neutral-700 pb-2`}>{line.trim().replace(/\*\*/g, '')}</h3>
                         <ul className="list-disc pl-5">{listItems}</ul>
                    </div>
                );
            } else if (line.trim().length > 0 && !line.trim().startsWith('*')) {
                // Paragraphs (apply bold/italics)
                let text = line;
                // Replace **bold**
                text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                // Replace *italic*
                text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                
                element = <p key={index} className="text-sm text-neutral-300 mb-4" dangerouslySetInnerHTML={{ __html: text }} />;
            } else {
                return null; // Ignore empty lines or unhandled list items
            }

            return element;
        });
    };


    return (
        // Modal Backdrop
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            {/* Modal Content - Large Rectangle */}
            <div className="relative w-full max-w-5xl h-[90vh] bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800 flex flex-col">
                
                {/* Header/Close Button */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-800 flex-shrink-0">
                    <h2 className={`font-['Oswald'] text-3xl font-bold tracking-wide text-red-500 uppercase leading-snug`}>
                        {article.title}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-3 rounded-full bg-neutral-800 text-neutral-400 hover:bg-red-700 hover:text-white transition-colors"
                    >
                        <XIcon size={20} />
                    </button>
                </div>

                {/* Body Content - Scrollable Area */}
                <div className="flex-grow overflow-y-auto p-6 text-white custom-scroll">
                    
                    {fullContent && (
                        <>
                        <p className="text-xs text-neutral-500 italic mb-6 pb-2">
                            Source: 
                            <a 
                                href={fullContent.citationUri} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ml-1 text-red-400 hover:text-red-300 underline break-all"
                            >
                                Official Formula 1 News Site
                            </a>
                        </p>
                        <div className="prose prose-sm prose-invert max-w-none">
                            {renderContent(fullContent.body)}
                        </div>
                        </>
                    )}

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-neutral-800 flex justify-end flex-shrink-0">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-600 transition-colors"
                    >
                        Close Article
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Component: Main News Page ---
export default function NewsPage() {
    const [filter, setFilter] = useState<Category>("all");
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    
    // We now use static data directly
    const articles = STATIC_ARTICLES;

    // Filtering logic
    const filteredArticles = useMemo(() => {
        const filtered = filter === "all"
          ? articles
          : articles.filter(a => a.category.toLowerCase() === filter);
        // Ensure the array is always non-empty if articles exist
        return filtered;
    }, [articles, filter]);
    
    // Handle article selection
    const handleArticleClick = (article: Article) => {
        setSelectedArticle(article);
    };

    // The first article in the filtered list is the Lead Article
    const leadArticle = filteredArticles[0];

    return (
        <>
            {/* Global Font Link in the Head */}
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
            </head>
            
            {/* Main Container - Full Height and No Overall Scroll */}
            <main className="bg-black text-white h-[calc(100vh-64px)] overflow-hidden p-6 sm:p-8">
                
                {/* Custom Scrollbar Style for the side list/modal */}
                <style jsx global>{`
                    .custom-scroll::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scroll::-webkit-scrollbar-thumb {
                        background-color: #4a4a4a;
                        border-radius: 3px;
                    }
                    .custom-scroll::-webkit-scrollbar-track {
                        background: #111;
                    }
                `}</style>
                
                {/* Content Wrapper */}
                <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
                    
                    {/* Header */}
                    <header className="flex items-end justify-between gap-4 flex-shrink-0">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
                                SimVixen Paddock
                            </p>
                            <h1 className={`font-['Oswald'] text-4xl md:text-5xl font-extrabold tracking-wide text-white uppercase`}>
                                News & Insights
                            </h1>
                        </div>

                        {/* Category filter pills */}
                        <div className="inline-flex rounded-full bg-neutral-900/70 p-1 text-[11px] border border-neutral-700 flex-shrink-0 shadow-lg">
                            {[
                                { key: "all", label: "Latest" },
                                { key: "race", label: "Race" },
                                { key: "analysis", label: "Analysis" },
                                { key: "tech", label: "Tech" },
                                { key: "driver", label: "Driver" }, // Changed general to driver
                            ].map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => setFilter(item.key as Category)}
                                    className={`px-4 py-1.5 rounded-full transition-colors font-bold uppercase tracking-wider ${
                                        filter === item.key
                                            ? "bg-red-700 text-white shadow-md"
                                            : "text-neutral-400 hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </header>
                    
                    {/* Main content: lead article + scrollable list */}
                    <section className="flex-1 flex flex-col md:flex-row gap-5 overflow-hidden">
                        
                        {/* 1. Lead article (first in filtered) - Fixed height for lead article container */}
                        <div className="md:w-2/3 flex-shrink-0" style={{ height: 'calc(100% - 0px)' }}> 
                            
                            {/* Lead Article Content */}
                            {leadArticle ? (
                                <article 
                                    onClick={() => handleArticleClick(leadArticle)}
                                    className="relative h-full rounded-xl border-2 border-red-700/50 bg-gradient-to-br from-neutral-900/80 via-neutral-950/90 to-black overflow-hidden flex flex-col justify-end p-8 gap-4 cursor-pointer hover:shadow-red-900/50 transition-shadow duration-300 shadow-xl group"
                                >
                                    {/* Background Image (Uses the article's image path) */}
                                    <div 
                                        className="absolute inset-0 opacity-90 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" // Increased opacity from 15 to 40
                                        style={{ 
                                            // Fallback to placeholder if the image path is not set up yet
                                            backgroundImage: `url('${leadArticle.imageUrl || '/f1_article_thumb_4.jpg'}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div> {/* Reduced overlay opacity from 50/40 to 30/20 */}

                                    {/* Content Overlay */}
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-300">
                                            <span className="px-3 py-1 rounded-full bg-red-700 text-xs font-bold shadow-md">
                                                TOP STORY
                                            </span>
                                            <span>{leadArticle.kicker}</span>
                                            <span className="text-neutral-500">• {leadArticle.timeAgo}</span>
                                        </div>
                                        <h2 className={`font-['Oswald'] text-4xl md:text-5xl font-bold leading-tight max-w-2xl mt-4 text-white hover:text-red-400 transition-colors`}>
                                            {leadArticle.title}
                                        </h2>
                                        <p className="text-lg text-neutral-300 italic max-w-3xl mt-2">
                                            {leadArticle.summary}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-red-500 mt-4 font-semibold uppercase tracking-wider">
                                            <span>Read Full Article</span> <ChevronRightIcon size={18} />
                                        </div>
                                    </div>
                                </article>
                            ) : (
                                <div className="h-full flex items-center justify-center rounded-xl border border-neutral-900 bg-neutral-950/70 text-neutral-500">
                                    No articles available for this filter.
                                </div>
                            )}
                        </div>

                        {/* 2. Side list (Scrollable, showing up to 9 articles max) */}
                        <div className="md:w-1/3 flex flex-col gap-3 flex-shrink-0">
                            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
                                More stories ({filteredArticles.length > 1 ? filteredArticles.slice(1).length : 0})
                            </p>
                            
                            {/* The list itself is the scrollable element */}
                            <div className="flex-1 overflow-y-auto custom-scroll border border-neutral-900 rounded-xl bg-neutral-950/70 divide-y divide-neutral-900 shadow-xl">
                                {filteredArticles.slice(1).map(article => (
                                    <article
                                        key={article.id}
                                        onClick={() => handleArticleClick(article)}
                                        className="p-3 flex gap-3 hover:bg-neutral-900/70 transition-colors cursor-pointer"
                                    >
                                        {/* New: Small Image Thumbnail (Fixed Size) */}
                                        <div 
                                            className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-800"
                                            style={{ 
                                                backgroundImage: `url('${article.imageUrl}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            {/* Placeholder if image fails or is slow to load */}
                                        </div>

                                        {/* Text Content */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] uppercase tracking-[0.18em] text-red-400 font-semibold">
                                                    {article.kicker}
                                                </span>
                                                <span className="text-[10px] text-neutral-500 flex-shrink-0">
                                                    {article.timeAgo}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-semibold leading-snug text-white hover:text-red-300 transition-colors">
                                                {article.title}
                                            </h3>
                                            <div className="mt-1 inline-flex items-center gap-2 text-[10px] text-neutral-600 uppercase tracking-[0.16em]">
                                                <span className="h-[1px] w-4 bg-neutral-800" />
                                                <span>{article.tag}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}

                                {/* Display message if only one article (the lead) is available */}
                                {filteredArticles.length <= 1 && (
                                    <div className="p-4 text-sm text-neutral-500">
                                        No more secondary stories in this category right now.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                
                {/* News Modal (Article Viewer) */}
                <NewsModal 
                    article={selectedArticle} 
                    onClose={() => setSelectedArticle(null)} 
                />
            </main>
        </>
    );
}