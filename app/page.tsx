"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
// Removed Link and Oswald imports as they are no longer needed

export default function HomePage() {
  const [showGlow, setShowGlow] = useState(false);

  // Smooth 2s toggle for the wireframe/glow effect
  useEffect(() => {
    const id = setInterval(() => setShowGlow(prev => !prev), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="bg-black relative">
      {/* Container for the whole visual area, using calc to fill space under Navbar */}
      <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center overflow-hidden">
        
        {/* Car Visual Area: Adjusted for wide horizontal coverage */}
        <div
          // Adjusted w/h to make it horizontally wide and cover the whole viewport
          className="relative w-[180vw] h-[100vh] flex items-center justify-center transition-all duration-500" 
        >
          {/* wireframe */}
          <Image
            src="/car-wire.png" 
            alt="Wireframe F1"
            fill
            priority
            className={`object-contain transition-opacity duration-1000 ${
              showGlow ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* glow */}
          <Image
            src="/car-glow.png" 
            alt="Glow F1"
            fill
            priority
            className={`object-contain transition-opacity duration-1000 ${
              showGlow ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        
        {/* --- Text and Button Overlay REMOVED --- */}
        {/* We will leave the Navbar itself to handle navigation to the Dashboard */}
      </div>
    </main>
  );
}