import React from 'react';

const Bio = () => {
    return (
        <div className="py-8 md:py-12 text-center animate-fade-in">
            <h1 className="text-primary tracking-widest text-2xl md:text-4xl font-bold text-glow mb-4">
                HI, I'M ROSHAN!
            </h1>
            <div className="inline-block glass-panel px-6 py-2 mb-8">
                <h2 className="text-accent-cyan text-sm md:text-base font-bold tracking-widest">
                    INTERESTED IN: INVESTMENT BANKING | QUANTITATIVE RESEARCH | EARLY-STAGE STARTUPS
                </h2>
            </div>

            <div className="max-w-3xl mx-auto text-left space-y-6 px-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {/* Minimal Bio - Content moved to Experience page */}
            </div>
        </div>
    );
};

export default Bio;
