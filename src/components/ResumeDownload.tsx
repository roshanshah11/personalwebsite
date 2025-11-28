"use client";

import React from 'react';

const ResumeDownload = () => {
    return (
        <a
            href="/roshan_shah_resume.pdf"
            download="Roshan_Shah_Resume.pdf"
            className="fixed bottom-20 right-6 z-50 group animate-fade-in"
            aria-label="Download Resume"
        >
            <div className="relative flex items-center gap-3 px-5 py-3 bg-black/90 border border-primary/50 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                {/* Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300 animate-bounce-subtle"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 9.75V1.5m0 0 3 3m-3-3-3 3" />
                </svg>

                {/* Text Label - Always visible now */}
                <span className="text-primary font-mono font-bold tracking-wider text-sm group-hover:text-white transition-colors duration-300">
                    RESUME
                </span>
            </div>
        </a>
    );
};

export default ResumeDownload;
