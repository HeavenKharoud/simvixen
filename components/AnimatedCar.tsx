"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// put your actual filenames here
import carWire from "@/public/car-wire.png";
import carGlow from "@/public/car-glow.png";

export default function Home() {
  const [showGlow, setShowGlow] = useState(false);

  // toggle every 2 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setShowGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="bg-black">
      {/* full area below navbar */}
      <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          {/* wireframe */}
          <Image
            src={carWire}
            alt="F1 car wireframe"
            priority
            className={`absolute w-full max-w-6xl object-contain transform -rotate-90 transition-opacity duration-1000 ${
              showGlow ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* glow version */}
          <Image
            src={carGlow}
            alt="F1 car glow"
            className={`absolute w-full max-w-6xl object-contain transform -rotate-90 transition-opacity duration-1000 ${
              showGlow ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </main>
  );
}

