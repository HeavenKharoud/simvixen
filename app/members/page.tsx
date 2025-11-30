"use client";
import React, { useState } from 'react';

// --- Inline SVG Icons ---

// CheckCircle Icon (Success/Included feature)
const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="M9 11l3 3L22 4"/>
    </svg>
);

// ArrowRight Icon (CTA Button)
const ArrowRightIcon = ({ className = "w-4 h-4 inline ml-2" }) => (
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
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
    </svg>
);

// Send Icon (Contact Sales CTA)
const SendIcon = ({ className = "w-4 h-4 inline ml-2" }) => (
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
        <path d="m22 2-7 20-4-9-9-4 20-7z"/>
        <path d="M15 15l4-4"/>
    </svg>
);

// ExternalLink Icon (Demo CTA)
const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
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
        <path d="M15 3h6v6"/>
        <path d="M10 14 21 3"/>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
);

// X (Close) Icon
const XIcon = ({ className = "w-6 h-6" }) => (
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
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
    </svg>
);


// --- Type Definitions ---
type TierKey = "access" | "pit_wall" | "enterprise";

type Tier = {
    id: TierKey;
    name: string;
    label: string;
    price: string;
    frequency: string;
    blurb: string;
    highlight?: boolean;
    features: {
        title: string;
        details: string;
        included: boolean;
    }[];
};

const TIERS: Tier[] = [
    {
        id: "access",
        name: "Grid Access",
        label: "Entry Level",
        price: "$0",
        frequency: "/ lifetime",
        blurb: "Fundamental data access for individual analysis and participation in public events.",
        features: [
            { title: "Public Session Access", details: "View live data and race replays for all public events.", included: true },
            { title: "Real-Time Leaderboard", details: "Access to live timing screens and gap charts.", included: true },
            { title: "Basic Data Export", details: "Limited data export to CSV (up to 5 laps per session).", included: true },
            { title: "Telemetry Analysis", details: "Advanced, multi-channel telemetry comparison tools.", included: false },
            { title: "Private Workspace", details: "Dedicated data storage and collaboration area.", included: false },
            { title: "Dedicated Support", details: "24/7 priority support channel for technical issues.", included: false },
        ],
    },
    {
        id: "pit_wall",
        name: "Pit Wall Pro",
        label: "Recommended",
        price: "$49",
        frequency: "/ month",
        blurb: "The complete toolkit for serious analysts, engineers, and high-performance drivers.",
        highlight: true,
        features: [
            { title: "Public Session Access", details: "View live data and race replays for all public events.", included: true },
            { title: "Real-Time Leaderboard", details: "Access to live timing screens and gap charts.", included: true },
            { title: "Unlimited Data Export", details: "Unlimited data export to CSV and JSON.", included: true },
            { title: "Telemetry Analysis", details: "Advanced, multi-channel telemetry comparison tools, including strategy simulation.", included: true },
            { title: "Private Workspace", details: "Dedicated data storage and collaboration area (up to 5 users).", included: false },
            { title: "Priority Support & Voting", details: "24/7 priority feature voting and early access to new tools.", included: true },
        ],
    },
    {
        id: "enterprise",
        name: "Race Control",
        label: "Organization",
        price: "Custom",
        frequency: "",
        blurb: "Scalable platform for professional racing organizations and large analysis teams.",
        features: [
            { title: "API Integration", details: "Full data ingestion API for integration with custom systems.", included: true },
            { title: "White-Label Solution", details: "Custom branding and white-label options for external data sharing.", included: true },
            { title: "Unlimited Data Export", details: "Unlimited data export with API access.", included: true },
            { title: "Advanced Strategy Tools", details: "Full strategy simulation and predictive modeling tools.", included: true },
            { title: "Private Workspace", details: "Dedicated data storage and collaboration area (unlimited users).", included: true },
            { title: "Dedicated Support", details: "Direct line to engineering team for custom development and setup.", included: true },
        ],
    },
];

// Component to handle the modal display and form submission
const PurchaseModal = ({ isOpen, closeModal, tier }) => {
    if (!isOpen || !tier) return null;

    const isEnterprise = tier.id === 'enterprise';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would integrate with a payment gateway or CRM
        console.log(`Form submitted for ${tier.name}`);
        alert(`Thank you for your interest in the ${tier.name} plan! We will process your request shortly.`);
        closeModal();
    };

    return (
        // Modal Overlay
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 transition-opacity duration-300"
            onClick={closeModal} // Close when clicking the backdrop
        >
            {/* Modal Content - prevents closing when clicking inside */}
            <div 
                className="bg-neutral-900 border border-red-700/50 rounded-xl w-full max-w-lg shadow-2xl p-6 md:p-8 transform transition-transform duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-start mb-6 border-b border-neutral-800 pb-4">
                    <h2 className={`text-3xl font-bold ${isEnterprise ? 'text-red-500' : 'text-white'}`}>
                        {isEnterprise ? `Contact for ${tier.name}` : `Upgrade to ${tier.name}`}
                    </h2>
                    <button onClick={closeModal} className="text-neutral-500 hover:text-red-500 transition-colors">
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Common Fields */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Full Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            required 
                            className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email Address</label>
                        <input 
                            id="email" 
                            type="email" 
                            required 
                            className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                        />
                    </div>

                    {/* Pit Wall Pro (Subscription/Payment Details) */}
                    {!isEnterprise && (
                        <>
                            <div className="pt-4 border-t border-neutral-800">
                                <h3 className="text-lg font-semibold text-white mb-2">Subscription Details</h3>
                                <p className="text-neutral-400 mb-4">You are activating: {tier.price}{tier.frequency}</p>
                            </div>
                            {/* Placeholder for Payment Fields */}
                            <div className="p-4 bg-neutral-950 rounded-lg border border-neutral-800 text-sm text-neutral-500">
                                [Placeholder for Credit Card / Payment Gateway Integration]
                                <div className="mt-2 text-xs text-red-700">Payment processing requires a secure backend integration.</div>
                            </div>
                        </>
                    )}

                    {/* Race Control (Enterprise Details) */}
                    {isEnterprise && (
                        <>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-neutral-300 mb-1">Organization Name</label>
                                <input 
                                    id="company" 
                                    type="text" 
                                    required 
                                    className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="needs" className="block text-sm font-medium text-neutral-300 mb-1">Project Requirements / Team Size</label>
                                <textarea 
                                    id="needs" 
                                    rows={3}
                                    required 
                                    className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                                />
                            </div>
                        </>
                    )}
                    
                    <button
                        type="submit"
                        className={`
                            w-full px-8 py-3 mt-6 rounded-lg font-bold text-white shadow-xl transition-all duration-300
                            ${isEnterprise ? 'bg-neutral-600 hover:bg-neutral-500' : 'bg-red-600 hover:bg-red-500'}
                        `}
                    >
                        {isEnterprise ? 'Submit Contact Request' : 'Proceed to Checkout'}
                    </button>
                    
                </form>
            </div>
        </div>
    );
};


// Custom component for the static, full-feature card
const PricingCard = ({ tier, openModal }) => {
    const buttonText = tier.id === 'enterprise' ? 'Contact Sales' : 'Activate Plan';

    return (
        <div
            className={`
                bg-neutral-950/70 border rounded-xl shadow-2xl transition-all duration-300 p-6 md:p-8 h-full flex flex-col
                ${tier.highlight ? 'border-red-700/80 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'border-neutral-900'}
            `}
        >
            {/* Header Area */}
            <div className="flex-shrink-0">
                
                {/* Recommendation Label */}
                {tier.highlight && (
                    <span className="mb-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-600 text-white tracking-widest">
                        RECOMMENDED
                    </span>
                )}
                
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">{tier.name}</h2>
                        <p className="text-sm text-neutral-400 mt-1">{tier.blurb}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className={`text-4xl font-extrabold ${tier.highlight ? 'text-red-500' : 'text-neutral-200'}`}>
                            {tier.price}
                        </p>
                        <p className="text-sm text-neutral-500">{tier.frequency}</p>
                    </div>
                </div>
            </div>

            {/* Detailed Body (Features always visible) */}
            <div className="flex-grow">
                <div className="h-px bg-neutral-800 my-4" />
                
                <h3 className="text-lg font-semibold text-white mb-4">Key Capabilities</h3>
                <div className="grid grid-cols-1 gap-6">
                    {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                            <div className="flex-shrink-0 pt-1">
                                {feature.included ? (
                                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                ) : (
                                    // Empty circle for non-included feature
                                    <span className="w-5 h-5 block border-2 border-neutral-700 rounded-full"></span>
                                )}
                            </div>
                            <div>
                                <p className={`font-semibold ${feature.included ? 'text-white' : 'text-neutral-500'}`}>{feature.title}</p>
                                <p className={`text-sm ${feature.included ? 'text-neutral-400' : 'text-neutral-600'}`}>{feature.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Footer */}
            <div className="mt-8 flex flex-col gap-3 flex-shrink-0">
                <button
                    onClick={() => openModal(tier.id)}
                    className={`
                        w-full px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.01]
                        ${tier.id === 'access' ? 'bg-neutral-800 hover:bg-neutral-700' : tier.id === 'enterprise' ? 'bg-neutral-600 hover:bg-neutral-500' : 'bg-red-600 hover:bg-red-500'}
                    `}
                    disabled={tier.id === 'access'} // Disable CTA for the free tier
                >
                    {tier.id === 'access' ? 'Current Plan / Included' : (
                        <div className="flex items-center justify-center">
                            {buttonText} {tier.id === 'enterprise' ? <SendIcon /> : <ArrowRightIcon />}
                        </div>
                    )}
                </button>

                {tier.id !== 'access' && (
                    <a
                        href="#"
                        className="text-center text-xs text-neutral-500 hover:text-red-500 transition-colors flex items-center justify-center gap-1"
                    >
                        View Platform Demo <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default function App() {
    // State for managing the Purchase/Contact Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTierId, setSelectedTierId] = useState<TierKey | null>(null);

    const openModal = (tierId: TierKey) => {
        setSelectedTierId(tierId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTierId(null);
    };

    const currentStatus = TIERS[0]; // Assume current user is on Grid Access
    const selectedTier = TIERS.find(t => t.id === selectedTierId);

    return (
        <main className="min-h-screen bg-black text-white font-inter">
            <div className="p-6 md:p-12">
                {/* Header Section (Full Width) */}
                <section className="pb-10 border-b border-neutral-800 mb-12">
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mb-2">
                        Platform Access
                    </p>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-red-600">
                                Unlock Data Advantage.
                            </h1>
                            <p className="text-lg text-neutral-300">
                                Gain unrestricted access to the advanced analytics platform, custom strategy tools, and high-fidelity race data built for professionals and engineering teams.
                            </p>
                        </div>
                        
                        {/* Status / Quick CTA */}
                        <div className="flex flex-col items-start lg:items-end gap-2 mt-4 lg:mt-0">
                            <div className="inline-flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-950/80 px-4 py-2 text-xs">
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600/90 text-[10px] font-semibold">
                                    N
                                </span>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-neutral-200">Current Plan: {currentStatus.name}</span>
                                    <span className="text-neutral-500">
                                        Last renewal: October 2024
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">
                                Data for winning strategies. Engineered for speed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards Section (Full Feature Comparison) */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {TIERS.map(tier => (
                        <PricingCard
                            key={tier.id}
                            tier={tier}
                            openModal={openModal}
                        />
                    ))}
                </section>
                
                {/* Footer Note */}
                <section className="mt-12 text-center">
                    <p className="text-sm text-neutral-600">
                        All subscriptions renew monthly. Cancel or downgrade anytime via your account settings. Contact us for custom integration requirements.
                    </p>
                </section>

            </div>
            
            {/* The Modal Component */}
            <PurchaseModal 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                tier={selectedTier} 
            />

        </main>
    );
}