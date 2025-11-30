"use client";

import { useState, useEffect } from "react";
import HomeGrid from "@/components/HomeGrid";
import IntroAnimation from "@/components/IntroAnimation";
import { motion } from "framer-motion";

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
    <div className="flex flex-col min-h-screen bg-background-dark selection:bg-white/20">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">

        {/* Background Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="z-10 w-full flex items-center justify-center flex-grow h-full">
          <HomeGrid />
        </div>

        {/* Replay Intro Button */}
        <button
          onClick={() => setShowIntro(true)}
          className="fixed top-6 left-6 z-40 p-3 text-text-muted hover:text-primary transition-all duration-300 group flex items-center gap-3 bg-background-dark/50 backdrop-blur-sm rounded-full border border-white/5 hover:border-primary/30"
          aria-label="Replay Intro"
        >
          <span className="text-xs font-mono font-bold tracking-widest">
            REPLAY INTRO
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:rotate-180 transition-transform duration-500"
          >
            <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.51 15C4.1697 16.9708 5.48915 18.652 7.24746 19.7698C9.00578 20.8876 11.0964 21.3744 13.1666 21.1476C15.2368 20.9208 17.1595 20.0009 18.6118 18.5439C20.0641 17.0868 20.9574 15.1802 21.1396 13.1456C21.3218 11.111 20.7818 9.07207 19.6105 7.3731C18.4392 5.67413 16.7078 4.4184 14.7104 3.8177C12.7131 3.21701 10.5726 3.30769 8.65 4.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      </main>

      {/* Bottom Navigation */}
      <footer className="pb-6 flex justify-center">
        <a
          href="/awards"
          className="text-sm font-mono text-text-muted hover:text-primary transition-colors tracking-widest"
        >
          [ VIEW ALL AWARDS ]
        </a>
      </footer>
    </div>
  );
}
