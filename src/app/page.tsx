"use client";

import { useState, useEffect } from "react";

import NavigationMenu from "@/components/NavigationMenu";
import Bio from "@/components/Bio";

import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}


      <div className="flex-grow flex flex-col p-2 md:p-4">

        <main className="flex-grow flex flex-col items-center justify-center text-center">
          <Bio />
          <NavigationMenu />

          <button
            onClick={() => {
              sessionStorage.removeItem('hasSeenIntro');
              window.location.reload();
            }}
            className="mt-12 text-xs text-text-muted hover:text-accent-cyan transition-colors uppercase tracking-widest opacity-50 hover:opacity-100"
          >
            [ REPLAY INTRO SEQUENCE ]
          </button>
        </main>
      </div>

      {/* Persistent Navigation Hint */}
      {!showIntro && (<div className="fixed left-4 bottom-20 z-40 flex flex-col items-start pointer-events-none">
        <span className="text-accent-cyan font-handwriting text-xl mb-2 animate-pulse whitespace-nowrap">
          navigate throughout the webpage here!!
        </span>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-cyan">
          <path
            d="M20 5 C 20 15, 20 25, 20 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 5"
            className="animate-dash"
          />
          <path d="M15 30 L 20 35 L 25 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      )}
    </div>
  );
}
